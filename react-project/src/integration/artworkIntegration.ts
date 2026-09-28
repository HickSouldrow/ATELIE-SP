// Obras registradas ficam só no aparelho (recurso do app Android):
// - a foto é movida do cache da câmera para <documentos>/artworks/<id>.jpg;
// - os metadados ficam no AsyncStorage, numa lista única filtrada por userId.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';

import { Artwork, NewArtwork } from '@/@types/artwork';
import { createId } from '@/utils/createId';

const STORAGE_KEY = '@ateliesp/artworks';
const PHOTOS_DIRECTORY = 'artworks';

// Enfileira as escritas para duas operações seguidas não se sobrescreverem.
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = writeQueue.then(task, task);
    writeQueue = run.catch(() => {});
    return run;
}

function getPhotosDirectory(): Directory {
    const directory = new Directory(Paths.document, PHOTOS_DIRECTORY);

    if (!directory.exists) {
        directory.create({ intermediates: true, idempotent: true });
    }

    return directory;
}

async function readAll(): Promise<Artwork[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as Artwork[]) : [];
    } catch {
        return [];
    }
}

async function writeAll(artworks: Artwork[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
}

function newestFirst(a: Artwork, b: Artwork) {
    return b.createdAt.localeCompare(a.createdAt);
}

export function deletePhotoFile(uri: string) {
    try {
        const file = new File(uri);
        if (file.exists) {
            file.delete();
        }
    } catch {
        // A foto já não existe: nada a fazer.
    }
}

export async function listArtworks(filter: { userId?: string } = {}): Promise<Artwork[]> {
    const artworks = await readAll();
    const visible = filter.userId
        ? artworks.filter((artwork) => artwork.userId === filter.userId)
        : artworks;

    return [...visible].sort(newestFirst);
}

export async function getArtwork(id: string): Promise<Artwork | null> {
    const artworks = await readAll();
    return artworks.find((artwork) => artwork.id === id) ?? null;
}

export function saveArtwork(input: NewArtwork): Promise<Artwork> {
    return enqueue(async () => {
        const id = createId('a_');
        const photo = new File(input.tempPhotoUri);
        const extension = photo.extension || '.jpg';
        const destination = new File(getPhotosDirectory(), `${id}${extension}`);

        // "Move" em duas etapas: copia, grava os metadados e só então apaga a
        // foto do cache. Se a gravação falhar, a foto original continua lá e
        // o usuário pode tentar salvar de novo.
        await photo.copy(destination);

        const { tempPhotoUri, ...metadata } = input;
        const artwork: Artwork = {
            ...metadata,
            id,
            photoUri: destination.uri,
            createdAt: new Date().toISOString(),
        };

        try {
            const artworks = await readAll();
            await writeAll([artwork, ...artworks]);
        } catch (err) {
            deletePhotoFile(destination.uri);
            throw err;
        }

        deletePhotoFile(tempPhotoUri);

        return artwork;
    });
}

export function deleteArtwork(id: string, userId: string): Promise<void> {
    return enqueue(async () => {
        const artworks = await readAll();
        const target = artworks.find((artwork) => artwork.id === id);

        if (!target) {
            return;
        }

        if (target.userId !== userId) {
            throw new Error('Você só pode excluir as obras que registrou.');
        }

        await writeAll(artworks.filter((artwork) => artwork.id !== id));
        deletePhotoFile(target.photoUri);
    });
}

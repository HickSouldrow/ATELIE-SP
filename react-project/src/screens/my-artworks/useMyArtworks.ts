import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { Artwork } from '@/@types/artwork';
import { useAuth } from '@/contexts/AuthContext';
import { deleteArtwork, listArtworks } from '@/integration/artworkIntegration';

export function useMyArtworks() {
    const router = useRouter();
    const { auth } = useAuth();

    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const userId = auth?.userId;

    const load = useCallback(
        async (mode: 'initial' | 'refresh' = 'initial') => {
            if (!userId) {
                return;
            }

            if (mode === 'refresh') {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }
            setLoadError('');

            try {
                // Só as obras do usuário logado: ao trocar de conta, a lista troca junto.
                setArtworks(await listArtworks({ userId }));
            } catch {
                setLoadError('Não foi possível carregar suas obras.');
            } finally {
                setIsLoading(false);
                setIsRefreshing(false);
            }
        },
        [userId],
    );

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load]),
    );

    function openDetails(id: string) {
        router.push(`/artwork/${id}`);
    }

    function goToRegister() {
        router.push('/register-artwork');
    }

    function confirmDelete(artwork: Artwork) {
        Alert.alert(
            'Excluir obra?',
            `"${artwork.title}" e a foto serão apagadas deste aparelho. Não dá para desfazer.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: () => remove(artwork) },
            ],
        );
    }

    async function remove(artwork: Artwork) {
        if (!userId) {
            return;
        }

        setDeletingId(artwork.id);

        try {
            await deleteArtwork(artwork.id, userId);
            setArtworks((prev) => prev.filter((item) => item.id !== artwork.id));
        } catch (err) {
            Alert.alert(
                'Não foi possível excluir',
                err instanceof Error ? err.message : 'Tente novamente.',
            );
        } finally {
            setDeletingId(null);
        }
    }

    return {
        auth,
        artworks,
        isLoading,
        isRefreshing,
        loadError,
        deletingId,
        refresh: () => load('refresh'),
        reload: () => load(),
        openDetails,
        goToRegister,
        confirmDelete,
    };
}

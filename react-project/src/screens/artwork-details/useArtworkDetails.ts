import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Artwork } from '@/@types/artwork';
import { useAuth } from '@/contexts/AuthContext';
import { deleteArtwork, getArtwork } from '@/integration/artworkIntegration';

export function useArtworkDetails() {
    const router = useRouter();
    const { auth } = useAuth();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [photoFailed, setPhotoFailed] = useState(false);

    useEffect(() => {
        let active = true;

        setIsLoading(true);
        getArtwork(String(id))
            .then((found) => active && setArtwork(found))
            .catch(() => active && setArtwork(null))
            .finally(() => active && setIsLoading(false));

        return () => {
            active = false;
        };
    }, [id]);

    const isOwner = !!artwork && !!auth && artwork.userId === auth.userId;

    function goBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/my-artworks');
        }
    }

    function openOnMap() {
        if (artwork) {
            router.push(`/map?focus=${artwork.id}`);
        }
    }

    // Abre no app de mapas do aparelho (Google Maps) com o pino no local.
    function openInMapsApp() {
        if (!artwork) {
            return;
        }

        const { latitude, longitude, title } = artwork;
        const geoUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(title)})`;
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

        Linking.openURL(geoUrl).catch(() => Linking.openURL(webUrl).catch(() => {}));
    }

    function confirmDelete() {
        if (!artwork) {
            return;
        }

        Alert.alert(
            'Excluir obra?',
            `"${artwork.title}" e a foto serão apagadas deste aparelho. Não dá para desfazer.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: remove },
            ],
        );
    }

    async function remove() {
        if (!artwork || !auth) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteArtwork(artwork.id, auth.userId);
            goBack();
        } catch (err) {
            Alert.alert(
                'Não foi possível excluir',
                err instanceof Error ? err.message : 'Tente novamente.',
            );
            setIsDeleting(false);
        }
    }

    return {
        auth,
        artwork,
        isLoading,
        isOwner,
        isDeleting,
        photoFailed,
        setPhotoFailed,
        goBack,
        openOnMap,
        openInMapsApp,
        confirmDelete,
    };
}

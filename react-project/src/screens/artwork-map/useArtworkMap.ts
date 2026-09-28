import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import MapView, { Region } from 'react-native-maps';

import { Artwork } from '@/@types/artwork';
import { useAuth } from '@/contexts/AuthContext';
import { listArtworks } from '@/integration/artworkIntegration';

import { MapFilter } from './types';

// Centro de São Paulo, usado enquanto não há obras para enquadrar.
export const SAO_PAULO_REGION: Region = {
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.12,
    longitudeDelta: 0.12,
};

const CLOSE_DELTA = 0.008;

export function useArtworkMap() {
    const router = useRouter();
    const { auth } = useAuth();
    const params = useLocalSearchParams<{ focus?: string }>();

    const mapRef = useRef<MapView>(null);
    const [filter, setFilter] = useState<MapFilter>('all');
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [showsUserLocation, setShowsUserLocation] = useState(false);

    const focusHandledRef = useRef(false);
    const lastFitKeyRef = useRef('');

    const userId = auth?.userId;

    const load = useCallback(async () => {
        setIsLoading(true);
        setLoadError('');

        try {
            const list = await listArtworks(filter === 'mine' && userId ? { userId } : {});
            setArtworks(list);
        } catch {
            setLoadError('Não foi possível carregar as obras.');
        } finally {
            setIsLoading(false);
        }
    }, [filter, userId]);

    // Recarrega ao voltar para o mapa (ex.: depois de excluir uma obra).
    useFocusEffect(
        useCallback(() => {
            load();
        }, [load]),
    );

    // Só mostra o ponto azul se a permissão já tiver sido dada.
    useEffect(() => {
        Location.getForegroundPermissionsAsync()
            .then((permission) => setShowsUserLocation(permission.granted))
            .catch(() => {});
    }, []);

    function zoomTo(artwork: Artwork) {
        mapRef.current?.animateToRegion(
            {
                latitude: artwork.latitude,
                longitude: artwork.longitude,
                latitudeDelta: CLOSE_DELTA,
                longitudeDelta: CLOSE_DELTA,
            },
            600,
        );
    }

    // Enquadra as obras quando o mapa e a lista ficam prontos, ou foca na obra
    // recém-registrada (?focus=<id>). Só reenquadra se a lista mudar de fato,
    // para não desfazer o zoom do usuário a cada volta para a tela.
    useEffect(() => {
        if (!isMapReady || isLoading) {
            return;
        }

        if (!focusHandledRef.current && params.focus) {
            const focused = artworks.find((artwork) => artwork.id === params.focus);
            if (focused) {
                focusHandledRef.current = true;
                lastFitKeyRef.current = artworks.map((artwork) => artwork.id).join(',');
                setSelectedId(focused.id);
                zoomTo(focused);
                return;
            }
        }

        const fitKey = artworks.map((artwork) => artwork.id).join(',');
        if (fitKey === lastFitKeyRef.current) {
            return;
        }
        lastFitKeyRef.current = fitKey;

        if (artworks.length === 1) {
            zoomTo(artworks[0]);
        } else if (artworks.length > 1) {
            mapRef.current?.fitToCoordinates(
                artworks.map(({ latitude, longitude }) => ({ latitude, longitude })),
                { edgePadding: { top: 180, right: 70, bottom: 240, left: 70 }, animated: true },
            );
        }
    }, [isMapReady, isLoading, artworks]);

    // Se a obra selecionada sumiu do filtro, fecha o cartão.
    useEffect(() => {
        if (selectedId && !artworks.some((artwork) => artwork.id === selectedId)) {
            setSelectedId(null);
        }
    }, [artworks, selectedId]);

    function changeFilter(next: MapFilter) {
        if (next !== filter) {
            setSelectedId(null);
            setFilter(next);
        }
    }

    function selectArtwork(id: string) {
        setSelectedId(id);
    }

    function clearSelection() {
        setSelectedId(null);
    }

    function openDetails(id: string) {
        router.push(`/artwork/${id}`);
    }

    function goToRegister() {
        router.push('/register-artwork');
    }

    async function centerOnUser() {
        try {
            const permission = await Location.requestForegroundPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    'Sem acesso à localização',
                    'Libere a localização para ver onde você está no mapa.',
                    permission.canAskAgain
                        ? [{ text: 'Ok' }]
                        : [
                              { text: 'Agora não', style: 'cancel' },
                              { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
                          ],
                );
                return;
            }

            setShowsUserLocation(true);

            const position =
                (await Location.getLastKnownPositionAsync({ maxAge: 60 * 1000 })) ??
                (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));

            mapRef.current?.animateToRegion(
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                },
                600,
            );
        } catch {
            Alert.alert('Localização indisponível', 'Verifique se o GPS do aparelho está ligado.');
        }
    }

    const selectedArtwork = artworks.find((artwork) => artwork.id === selectedId) ?? null;

    return {
        auth,
        mapRef,
        filter,
        changeFilter,
        artworks,
        isLoading,
        loadError,
        reload: load,
        selectedArtwork,
        selectArtwork,
        clearSelection,
        openDetails,
        goToRegister,
        centerOnUser,
        isMapReady,
        setIsMapReady,
        showsUserLocation,
    };
}

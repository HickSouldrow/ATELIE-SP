import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { ArtworkMarkerProps } from './types';

// Tempo para o Google Maps redesenhar o marcador depois de uma mudança.
const SETTLE_MS = 500;

const ArtworkMarkerAndroid: React.FC<ArtworkMarkerProps> = ({ artwork, selected = false, onPress }) => {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'failed'>('loading');
    const [settling, setSettling] = useState(true);

    // No Android o marcador vira um bitmap. tracksViewChanges precisa ficar
    // ligado até a foto carregar (senão aparece vazio) e logo depois de mudar a
    // seleção; fora isso fica desligado para o mapa não pesar.
    useEffect(() => {
        setSettling(true);
        const timer = setTimeout(() => setSettling(false), SETTLE_MS);
        return () => clearTimeout(timer);
    }, [selected, imageState]);

    return (
        <Marker
            coordinate={{ latitude: artwork.latitude, longitude: artwork.longitude }}
            anchor={{ x: 0.5, y: 1 }}
            onPress={onPress}
            tracksViewChanges={settling || imageState === 'loading'}
            zIndex={selected ? 10 : 1}>
            <View style={styles.container}>
                <View style={[styles.bubble, selected && styles.bubbleSelected]}>
                    {imageState === 'failed' ? (
                        <View style={styles.fallback}>
                            <Ionicons name="color-palette" size={selected ? 26 : 20} color={Colors.accent} />
                        </View>
                    ) : (
                        <Image
                            source={{ uri: artwork.photoUri }}
                            style={styles.photo}
                            resizeMethod="resize"
                            onLoad={() => setImageState('loaded')}
                            onError={() => setImageState('failed')}
                        />
                    )}
                </View>
                <View style={[styles.pointer, selected && styles.pointerSelected]} />
            </View>
        </Marker>
    );
};

export { ArtworkMarkerAndroid as ArtworkMarker };
export default ArtworkMarkerAndroid;

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { AuthBackgroundProps } from './types';

const AuthBackgroundWeb: React.FC<AuthBackgroundProps> = ({
    source,
    blurRadius = 6,
    overlayColor = Colors.overlayBrand,
}) => {
    return (
        <View style={styles.layer} pointerEvents="none">
            <Image
                source={source}
                style={[styles.image, { filter: `blur(${blurRadius}px)` } as any]}
                resizeMode="cover"
            />
            <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    layer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: Colors.background,
    } as any,
    image: {
        width: '100%',
        height: '100%',
        transform: [{ scale: 1.08 }],
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { AuthBackgroundWeb as AuthBackground };
export default AuthBackgroundWeb;

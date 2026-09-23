import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { AuthBackgroundProps } from './types';

const FALLBACK_RATIO = 16 / 9;


const AuthBackgroundAndroid: React.FC<AuthBackgroundProps> = ({
    source,
    blurRadius = 0,
    overlayColor = Colors.overlayBrand,
}) => {
    const { width } = useWindowDimensions();

    const resolved = Image.resolveAssetSource(source as number);
    const ratio =
        resolved?.width && resolved?.height ? resolved.width / resolved.height : FALLBACK_RATIO;
    const imageHeight = Math.round(width / ratio);

    return (
        <View style={styles.layer}>
            <Image
                source={source}
                style={{ width, height: imageHeight }}
                blurRadius={blurRadius}
                resizeMode="cover"
            />
            <LinearGradient
                colors={[overlayColor, Colors.background]}
                locations={[0, 1]}
                style={[styles.fade, { height: imageHeight + 1 }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    layer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background,
        zIndex: 0,
        elevation: 0,
        pointerEvents: 'none',
    },
    fade: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});

export { AuthBackgroundAndroid as AuthBackground };
export default AuthBackgroundAndroid;

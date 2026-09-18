import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { AuthBackgroundProps } from './types';

const AuthBackgroundAndroid: React.FC<AuthBackgroundProps> = ({
    source,
    blurRadius = 6,
    overlayColor = Colors.overlayBrand,
}) => {
    return (
        <View style={styles.layer} pointerEvents="none">
            <Image
                source={source}
                style={styles.image}
                blurRadius={blurRadius}
                resizeMode="cover"
            />
            <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    layer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { AuthBackgroundAndroid as AuthBackground };
export default AuthBackgroundAndroid;

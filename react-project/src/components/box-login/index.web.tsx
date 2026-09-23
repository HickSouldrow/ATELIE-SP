import React from 'react';
import { Image, useWindowDimensions, View } from 'react-native';

import { styles } from './styles';
import { BoxLoginProps } from './types';

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

const BoxLoginWeb: React.FC<BoxLoginProps> = ({ children, style, ...rest }) => {
    const { width, height } = useWindowDimensions();

    const boxSize = { width: clamp(width * 0.3, 360, 480) };

    const contentPadding = {
        paddingVertical: clamp(height * 0.045, 32, 48),
        paddingHorizontal: clamp(width * 0.03, 28, 40),
    };

    return (
        <View style={[styles.box, boxSize, style]} {...rest}>
            <View style={[styles.inner, contentPadding]}>
                <Image
                    source={require('../../../assets/icone-login.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />

                <View style={styles.content}>{children}</View>
            </View>
        </View>
    );
};

export { BoxLoginWeb as BoxLogin };
export default BoxLoginWeb;

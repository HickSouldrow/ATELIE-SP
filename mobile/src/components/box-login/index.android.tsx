import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import { BoxLoginProps } from './types';

const BoxLoginAndroid: React.FC<BoxLoginProps> = ({ children, style, ...rest }) => {
    return (
        <View style={[styles.box, styles.boxMobile, style]} {...rest}>
            <View style={[styles.inner, styles.innerMobile]}>
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

export { BoxLoginAndroid as BoxLogin };
export default BoxLoginAndroid;

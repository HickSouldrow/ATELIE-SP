import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles';
import { AuthImagePanelProps } from './types';

const AuthImagePanelWeb: React.FC<AuthImagePanelProps> = ({ source, style, ...rest }) => {
    return (
        <View style={[styles.container, style]} {...rest}>
            <Image
                source={source ?? require('../../../assets/login-background.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', Colors.background]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                locations={[0.75, 1]}
                style={styles.edgeFade}
            />
        </View>
    );
};

export { AuthImagePanelWeb as AuthImagePanel };
export default AuthImagePanelWeb;

import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { ButtonProps } from './types';

const ButtonWeb: React.FC<ButtonProps> = ({ title, style, disabled, loading, ...rest }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                (disabled || loading) && styles.disabled,
                style as any,
            ]}
            disabled={disabled || loading}
            {...rest}>
            {loading ? (
                <ActivityIndicator color={Colors.white} />
            ) : (
                <Text style={styles.title}>{title}</Text>
            )}
        </Pressable>
    );
};

export { ButtonWeb as Button };
export default ButtonWeb;

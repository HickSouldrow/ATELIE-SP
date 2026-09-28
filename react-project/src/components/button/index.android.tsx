import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { ButtonProps } from './types';

const ButtonAndroid: React.FC<ButtonProps> = ({
    title,
    style,
    disabled,
    loading,
    variant = 'primary',
    icon,
    ...rest
}) => {
    const contentColor = variant === 'danger' ? Colors.error : Colors.onPrimary;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                styles[variant],
                pressed && styles[`${variant}Pressed` as const],
                (disabled || loading) && styles.disabled,
                style as any,
            ]}
            disabled={disabled || loading}
            accessibilityRole="button"
            aria-disabled={!!(disabled || loading)}
            aria-busy={!!loading}
            {...rest}>
            {loading ? (
                <ActivityIndicator color={contentColor} />
            ) : (
                <>
                    {!!icon && <Ionicons name={icon} size={18} color={contentColor} />}
                    <Text style={[styles.title, { color: contentColor }]}>{title}</Text>
                </>
            )}
        </Pressable>
    );
};

export { ButtonAndroid as Button };
export default ButtonAndroid;

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { AppTopBarProps } from './types';

const AppTopBarAndroid: React.FC<AppTopBarProps> = ({
    title,
    subtitle,
    onMenuPress,
    onBackPress,
    right,
    style,
    ...rest
}) => {
    const leftAction = onBackPress
        ? { icon: 'arrow-back' as const, label: 'Voltar', onPress: onBackPress }
        : onMenuPress
          ? { icon: 'menu' as const, label: 'Abrir menu', onPress: onMenuPress }
          : null;

    return (
        <View style={[styles.bar, style]} {...rest}>
            {leftAction && (
                <Pressable
                    onPress={leftAction.onPress}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={leftAction.label}
                    android_ripple={{ color: Colors.whiteAlpha['12'], borderless: true }}
                    style={styles.iconButton}>
                    <Ionicons name={leftAction.icon} size={22} color={Colors.text} />
                </Pressable>
            )}

            <View style={styles.titleGroup}>
                <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
                    {title}
                </Text>
                {!!subtitle && (
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>

            {right}
        </View>
    );
};

export { AppTopBarAndroid as AppTopBar };
export default AppTopBarAndroid;

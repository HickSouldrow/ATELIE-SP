import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { InputProps } from './types';

const InputWeb: React.FC<InputProps> = ({ icon, isPassword, hasError, onFocus, onBlur, ...rest }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.wrapper, isFocused && styles.wrapperFocused, hasError && styles.wrapperError]}>
            <Ionicons
                name={icon}
                size={18}
                color={hasError ? Colors.error : isFocused ? Colors.primaryLight : Colors.textMuted}
            />

            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.textSubtle}
                secureTextEntry={isPassword && !isVisible}
                onFocus={(event) => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
                {...rest}
            />

            {isPassword && (
                <Pressable
                    onPress={() => setIsVisible((prev) => !prev)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    style={styles.eyeButton}>
                    <Ionicons
                        name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={18}
                        color={Colors.textMuted}
                    />
                </Pressable>
            )}
        </View>
    );
};

export { InputWeb as Input };
export default InputWeb;

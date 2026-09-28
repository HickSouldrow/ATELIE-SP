import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { InputProps } from './types';

const InputAndroid: React.FC<InputProps> = ({ icon, isPassword, hasError, onFocus, onBlur, ...rest }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.wrapper, isFocused && styles.wrapperFocused, hasError && styles.wrapperError]}>
            <Ionicons
                name={icon}
                size={20}
                color={hasError ? Colors.error : isFocused ? Colors.primaryLight : Colors.textMuted}
            />

            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.textSubtle}
                selectionColor={Colors.primaryLight}
                cursorColor={Colors.primaryLight}
                secureTextEntry={isPassword && !isVisible}
                underlineColorAndroid="transparent"
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
                    accessibilityLabel={isVisible ? 'Ocultar senha' : 'Mostrar senha'}>
                    <Ionicons
                        name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={Colors.textMuted}
                    />
                </Pressable>
            )}
        </View>
    );
};

export { InputAndroid as Input };
export default InputAndroid;

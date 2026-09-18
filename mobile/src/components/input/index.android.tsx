import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { InputProps } from './types';

const InputAndroid: React.FC<InputProps> = ({ icon, isPassword, ...rest }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.wrapper}>
            <Ionicons name={icon} size={20} color={Colors.whiteAlpha['65']} />

            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.whiteAlpha['50']}
                secureTextEntry={isPassword && !isVisible}
                underlineColorAndroid="transparent"
                {...rest}
            />

            {isPassword && (
                <Pressable onPress={() => setIsVisible((prev) => !prev)} hitSlop={8}>
                    <Ionicons
                        name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={Colors.whiteAlpha['65']}
                    />
                </Pressable>
            )}
        </View>
    );
};

export { InputAndroid as Input };
export default InputAndroid;

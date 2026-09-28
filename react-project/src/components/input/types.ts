import { Ionicons } from '@expo/vector-icons';
import { Ref } from 'react';
import { TextInput, TextInputProps } from 'react-native';

export type InputProps = TextInputProps & {
    placeholder: string;
    icon: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    hasError?: boolean;
    // No React 19 o ref chega como prop comum e é repassado ao TextInput.
    ref?: Ref<TextInput>;
};

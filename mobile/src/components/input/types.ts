import { Ionicons } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

export type InputProps = TextInputProps & {
    placeholder: string;
    icon: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
};

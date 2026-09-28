import { Ionicons } from '@expo/vector-icons';
import { PressableProps } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonProps = PressableProps & {
    title: string;
    loading?: boolean;
    variant?: ButtonVariant;
    icon?: keyof typeof Ionicons.glyphMap;
};

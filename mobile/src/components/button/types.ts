import { PressableProps } from 'react-native';

export type ButtonProps = PressableProps & {
    title: string;
    loading?: boolean;
};

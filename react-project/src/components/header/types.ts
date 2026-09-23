import { ViewProps } from 'react-native';

export type HeaderProps = ViewProps & {
    username?: string | null;
    onEditProfile?: () => void;
};

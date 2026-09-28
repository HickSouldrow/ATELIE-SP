import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

export type AppTopBarProps = ViewProps & {
    title: string;
    subtitle?: string;
    // Mostra o botão de menu (hambúrguer) à esquerda.
    onMenuPress?: () => void;
    // Mostra a seta de voltar à esquerda (tem prioridade sobre o menu).
    onBackPress?: () => void;
    right?: ReactNode;
};

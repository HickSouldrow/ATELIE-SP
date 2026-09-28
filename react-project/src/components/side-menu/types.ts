import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

export type SideMenuItem = {
    key: string;
    label: string;
    icon: IconName;
    // Ícone preenchido usado quando o item está ativo.
    activeIcon?: IconName;
    route?: string;
    // Outras rotas que também deixam o item ativo (ex.: detalhes de uma obra).
    matches?: string[];
    // Recursos que só existem no app (câmera, mapa, arquivos): somem na Web.
    nativeOnly?: boolean;
    // Aparece desabilitado com o selo "Em breve".
    soon?: boolean;
};

export type SideMenuSection = {
    key: string;
    title: string;
    items: SideMenuItem[];
};

export type SideMenuProps = {
    visible: boolean;
    onClose: () => void;
    sections?: SideMenuSection[];
};

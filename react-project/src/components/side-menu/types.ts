import { Ionicons } from '@expo/vector-icons';

export type SideMenuItem = {
    key: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    route?: string;
};

export type SideMenuProps = {
    visible: boolean;
    onClose: () => void;
    items?: SideMenuItem[];
};

import { Ionicons } from '@expo/vector-icons';

export type AndroidOnlyNoticeProps = {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
};

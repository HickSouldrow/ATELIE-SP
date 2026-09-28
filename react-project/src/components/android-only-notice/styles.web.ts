import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        zIndex: 2,
    },
    center: {
        flex: 1,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    card: {
        width: '100%',
        maxWidth: 420,
        alignItems: 'center',
        gap: 12,
        padding: 28,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderTopWidth: 3,
        borderTopColor: Colors.accent,
    },
    iconWrap: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentSoft,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: Colors.highlightSoft,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.highlight,
    },
    title: {
        fontFamily: Fonts.displayItalic,
        fontSize: 26,
        color: Colors.text,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: Colors.textMuted,
        textAlign: 'center',
        marginBottom: 8,
    },
});

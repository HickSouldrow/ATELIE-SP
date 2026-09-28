import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    // 'fixed' cobre a janela inteira. Com absoluteFill o overlay ficava
    // limitado à altura do Header (60px) e o drawer não aparecia.
    overlay: {
        position: 'fixed' as any,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: Colors.overlay['60'],
    },
    backdropPressable: {
        flex: 1,
        cursor: 'auto',
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 288,
        backgroundColor: Colors.surface,
        borderRightWidth: 1,
        borderRightColor: Colors.border,
        paddingTop: 18,
        paddingBottom: 14,
        paddingHorizontal: 16,
    },
    edgeGlow: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingLeft: 8,
    },
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 20,
        color: Colors.text,
    },
    closeButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    closeButtonHovered: {
        backgroundColor: Colors.whiteAlpha['08'],
    },

    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: Colors.surfaceRaised,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 4,
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primarySoft,
        borderWidth: 2,
        borderColor: Colors.accent,
    },
    userInitial: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
    },
    userCaption: {
        fontSize: 12,
        color: Colors.textSubtle,
        marginTop: 1,
    },

    list: {
        paddingBottom: 8,
    },
    section: {
        marginTop: 16,
        gap: 2,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: Colors.textSubtle,
        paddingHorizontal: 12,
        marginBottom: 6,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        minHeight: 44,
        paddingHorizontal: 12,
        borderRadius: 10,
        cursor: 'pointer',
    },
    itemHovered: {
        backgroundColor: Colors.whiteAlpha['06'],
    },
    itemActive: {
        backgroundColor: Colors.primarySoft,
    },
    itemSoon: {
        cursor: 'auto',
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        top: 9,
        bottom: 9,
        width: 3,
        borderRadius: 2,
        backgroundColor: Colors.accent,
    },
    itemLabel: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textMuted,
    },
    itemLabelHovered: {
        color: Colors.text,
    },
    itemLabelActive: {
        color: Colors.text,
        fontWeight: '700',
    },
    itemLabelSoon: {
        color: Colors.textDisabled,
    },
    soonBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: Colors.highlightSoft,
    },
    soonBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.highlight,
    },

    footer: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    logoutHovered: {
        backgroundColor: Colors.errorPressed,
    },
    logoutLabel: {
        color: Colors.error,
        fontWeight: '600',
    },
});

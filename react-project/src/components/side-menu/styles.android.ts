import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    // Sem Modal: o menu é um overlay absoluto dentro da própria tela,
    // acima de tudo (zIndex/elevation).
    overlay: {
        ...StyleSheet.absoluteFill,
        zIndex: 1000,
        elevation: 24,
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: Colors.overlay['60'],
    },
    backdropPressable: {
        flex: 1,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.surface,
        borderRightWidth: 1,
        borderRightColor: Colors.border,
        elevation: 16,
    },
    safeArea: {
        flex: 1,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 8,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primarySoft,
        borderWidth: 2,
        borderColor: Colors.accent,
    },
    userInitial: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
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
        minHeight: 48,
        paddingHorizontal: 12,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemActive: {
        backgroundColor: Colors.primarySoft,
    },
    activeIndicator: {
        position: 'absolute',
        left: 0,
        top: 10,
        bottom: 10,
        width: 3,
        borderRadius: 2,
        backgroundColor: Colors.accent,
    },
    itemLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: Colors.textMuted,
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
    logoutLabel: {
        color: Colors.error,
        fontWeight: '600',
    },
});

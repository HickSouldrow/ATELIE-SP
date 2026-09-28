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
    scrollArea: {
        flex: 1,
        zIndex: 1,
    },
    scroll: {
        paddingBottom: 60,
    },
    content: {
        width: '100%',
        maxWidth: 900,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 48,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.brandLight,
        marginBottom: 8,
    },
    title: {
        fontFamily: Fonts.displayItalic,
        fontSize: 34,
        color: Colors.white,
        textShadowColor: Colors.neonAlpha.pink30,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 16,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: Colors.whiteAlpha['65'],
        maxWidth: 620,
        marginBottom: 36,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    card: {
        flexGrow: 1,
        flexBasis: 300,
        alignItems: 'center',
        padding: 28,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['10'],
    },
    avatarRing: {
        width: 116,
        height: 116,
        borderRadius: 58,
        borderWidth: 3,
        borderColor: Colors.neon.pink,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 102,
        height: 102,
        borderRadius: 51,
        backgroundColor: Colors.surfaceAlt,
    },
    avatarFallback: {
        width: 102,
        height: 102,
        borderRadius: 51,
        backgroundColor: Colors.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        fontSize: 38,
        fontWeight: '700',
        color: Colors.white,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.white,
    },
    role: {
        fontSize: 13,
        color: Colors.brandLight,
        marginTop: 2,
    },
    handle: {
        fontSize: 13,
        color: Colors.whiteAlpha['55'],
        marginTop: 6,
        marginBottom: 20,
    },
    githubButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 11,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: Colors.btnPrimary,
        cursor: 'pointer',
    } as any,
    githubButtonHovered: {
        backgroundColor: Colors.btnPrimaryPressed,
    },
    githubButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.white,
    },
});

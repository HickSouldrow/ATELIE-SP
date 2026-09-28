import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    overlay: {
        flex: 1,
        backgroundColor: Colors.overlay['78'],
    },
    safeArea: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        gap: 12,
    },
    menuButton: {
        width: 38,
        height: 38,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteAlpha['08'],
    },
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 16,
        color: Colors.brandLight,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 40,
        gap: 16,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.brandLight,
    },
    title: {
        fontFamily: Fonts.displayItalic,
        fontSize: 28,
        color: Colors.white,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 21,
        color: Colors.whiteAlpha['65'],
        marginBottom: 8,
    },
    card: {
        alignItems: 'center',
        padding: 24,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['10'],
    },
    avatarRing: {
        width: 108,
        height: 108,
        borderRadius: 54,
        borderWidth: 3,
        borderColor: Colors.neon.pink,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    avatar: {
        width: 94,
        height: 94,
        borderRadius: 47,
        backgroundColor: Colors.surfaceAlt,
    },
    avatarFallback: {
        width: 94,
        height: 94,
        borderRadius: 47,
        backgroundColor: Colors.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        fontSize: 34,
        fontWeight: '700',
        color: Colors.white,
    },
    name: {
        fontSize: 19,
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
        marginBottom: 18,
    },
    githubButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        alignSelf: 'stretch',
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: Colors.btnPrimary,
        overflow: 'hidden',
    },
    githubButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.white,
    },
});

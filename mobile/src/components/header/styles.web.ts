import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.background,
        zIndex: 50,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 16,
        gap: 14,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    iconButtonHovered: {
        backgroundColor: Colors.whiteAlpha['08'],
    },
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 19,
        color: Colors.white,
        textShadowColor: Colors.neonAlpha.pink30,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    spacer: {
        flex: 1,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surfaceAlt,
        borderWidth: 1.5,
        borderColor: Colors.neon.cyan,
        cursor: 'pointer',
    },
    avatarHovered: {
        shadowColor: Colors.neon.cyan,
        shadowOpacity: 0.7,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
    },
    avatarInitial: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.white,
    },
    dropdownBackdrop: {
        position: 'fixed' as any,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: 'default',
    },
    dropdown: {
        position: 'absolute',
        top: 46,
        right: 0,
        minWidth: 190,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['10'],
        paddingVertical: 8,
        paddingHorizontal: 6,
        gap: 2,
        shadowColor: Colors.black,
        shadowOpacity: 0.4,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
    },
    dropdownUsername: {
        fontSize: 12,
        color: Colors.whiteAlpha['45'],
        paddingHorizontal: 10,
        paddingTop: 4,
        paddingBottom: 8,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 9,
        paddingHorizontal: 10,
        borderRadius: 6,
        cursor: 'pointer',
    },
    dropdownItemHovered: {
        backgroundColor: Colors.neonAlpha.cyan15,
    },
    dropdownItemLabel: {
        fontSize: 13,
        color: Colors.white,
    },
    glowLine: {
        height: 2,
        width: '100%',
        opacity: 0.85,
    },
});

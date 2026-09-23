import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    hero: {
        height: 360,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    heroImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    heroScrim: {
        ...StyleSheet.absoluteFillObject,
    },
    heroContent: {
        paddingHorizontal: 20,
        paddingBottom: 28,
        maxWidth: 640,
    },
    eyebrow: {
        fontSize: 13,
        color: Colors.neon.cyan,
        fontWeight: '600',
        marginBottom: 8,
    },
    heroTitle: {
        fontFamily: Fonts.displayItalic,
        fontSize: 34,
        color: Colors.white,
        textShadowColor: Colors.neonAlpha.pink30,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 16,
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 14,
        lineHeight: 21,
        color: Colors.whiteAlpha['65'],
    },

    mission: {
        paddingHorizontal: 20,
        paddingTop: 36,
        paddingBottom: 8,
    },
    missionHeading: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.white,
    },
    missionSubheading: {
        fontSize: 13,
        color: Colors.whiteAlpha['45'],
        marginTop: 4,
        marginBottom: 20,
        maxWidth: 460,
    },
    missionGrid: {
        gap: 14,
    },
    missionGridWide: {
        flexDirection: 'row',
    },
    missionCard: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['10'],
        borderTopWidth: 2,
        borderTopColor: Colors.neon.cyan,
        padding: 18,
        gap: 6,
    },
    missionCardWide: {
        flex: 1,
    },
    missionIcon: {
        fontSize: 22,
        marginBottom: 4,
    },
    missionCardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.white,
    },
    missionCardText: {
        fontSize: 13,
        lineHeight: 19,
        color: Colors.whiteAlpha['55'],
    },

    footer: {
        alignItems: 'center',
        padding: 24,
        gap: 10,
        marginTop: 20,
    },
    footerText: {
        fontSize: 13,
        color: Colors.whiteAlpha['45'],
    },
    footerButton: {
        width: '100%',
        maxWidth: 280,
        marginTop: 4,
    },
});

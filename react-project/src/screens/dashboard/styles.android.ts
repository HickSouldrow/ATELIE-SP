import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
    },
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 16,
        color: Colors.neon.cyan,
    },
    greeting: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.white,
        marginTop: 2,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surfaceAlt,
        borderWidth: 1.5,
        borderColor: Colors.neon.cyan,
    },
    avatarInitial: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.white,
    },

    content: {
        paddingBottom: 40,
    },

    gpsCard: {
        marginHorizontal: 20,
        marginBottom: 8,
        padding: 20,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.neonAlpha.cyan30,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    gpsIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.neonAlpha.cyan15,
        marginBottom: 12,
    },
    gpsTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 6,
    },
    gpsText: {
        fontSize: 12.5,
        lineHeight: 18,
        color: Colors.whiteAlpha['55'],
        textAlign: 'center',
        marginBottom: 12,
    },
    gpsBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: Colors.neonAlpha.yellow15,
    },
    gpsBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.neon.yellow,
    },

    mission: {
        paddingHorizontal: 20,
        paddingTop: 28,
        gap: 12,
    },
    missionHeading: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 4,
    },
    missionCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        padding: 14,
        borderRadius: 10,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['10'],
    },
    missionIconWrap: {
        width: 34,
        height: 34,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.neonAlpha.cyan15,
    },
    missionCardBody: {
        flex: 1,
    },
    missionCardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 2,
    },
    missionCardText: {
        fontSize: 12.5,
        lineHeight: 18,
        color: Colors.whiteAlpha['55'],
    },

    footer: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
});

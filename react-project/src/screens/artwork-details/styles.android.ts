import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 36,
        gap: 18,
    },

    photoFrame: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: Colors.surfaceRaised,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    photoFallback: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    photoFallbackText: {
        fontSize: 13,
        color: Colors.textSubtle,
    },

    header: {
        gap: 4,
    },
    title: {
        fontFamily: Fonts.displayItalic,
        fontSize: 28,
        color: Colors.text,
    },
    meta: {
        fontSize: 13,
        color: Colors.textSubtle,
    },
    description: {
        fontSize: 15,
        lineHeight: 23,
        color: Colors.textMuted,
    },
    descriptionEmpty: {
        fontSize: 14,
        fontStyle: 'italic',
        color: Colors.textSubtle,
    },

    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentSoft,
    },
    infoBody: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    infoText: {
        fontSize: 12,
        color: Colors.textSubtle,
        marginTop: 2,
    },

    actions: {
        gap: 10,
        marginTop: 4,
    },

    notFound: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
        padding: 24,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    notFoundTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.text,
    },
    notFoundText: {
        fontSize: 14,
        color: Colors.textMuted,
        textAlign: 'center',
        marginBottom: 8,
    },
});

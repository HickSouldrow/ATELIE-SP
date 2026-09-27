import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: Colors.overlayDark,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['10'],
        paddingHorizontal: 24,
        paddingVertical: 28,
        alignItems: 'center',
        gap: 10,
    },
    iconWrap: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.white,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: Colors.whiteAlpha['65'],
        textAlign: 'center',
        marginBottom: 12,
    },
    button: {
        width: '100%',
        marginTop: 4,
    },
});

import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    overlay: {
        flex: 1,
        backgroundColor: Colors.scrim,
    },
    safeArea: {
        flex: 1,
        zIndex: 1,
        elevation: 1,
    },
    container: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 28,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
    },
    fieldsGroup: {
        width: '100%',
        gap: 12,
        marginBottom: 24,
    },
    field: {
        width: '100%',
        gap: 4,
    },
    fieldError: {
        fontSize: 12,
        color: Colors.error,
    },
    fieldHint: {
        fontSize: 12,
        color: Colors.textSubtle,
    },
    error: {
        width: '100%',
        fontSize: 13,
        color: Colors.error,
        textAlign: 'center',
        marginBottom: 12,
    },
    linkRow: {
        marginTop: 16,
        paddingVertical: 4,
    },
    link: {
        fontSize: 14,
        color: Colors.textMuted,
        textDecorationLine: 'underline',
    },
});

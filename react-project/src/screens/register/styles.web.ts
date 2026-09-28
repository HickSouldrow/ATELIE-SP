import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollArea: {
        flex: 1,
        zIndex: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 32,
    },
    centerWrap: {
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 16,
    },
    fieldsGroup: {
        width: '100%',
        gap: 10,
        marginBottom: 28,
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
        marginTop: 14,
    },
    link: {
        fontSize: 13,
        color: Colors.textMuted,
        textDecorationLine: 'underline',
    },
});

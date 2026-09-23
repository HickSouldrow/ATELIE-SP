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
        color: Colors.white,
        marginBottom: 16,
    },
    fieldsGroup: {
        width: '100%',
        gap: 10,
        marginBottom: 28,
    },
    error: {
        width: '100%',
        fontSize: 13,
        color: Colors.semantic.error.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    linkRow: {
        marginTop: 14,
    },
    link: {
        fontSize: 13,
        color: Colors.whiteAlpha['55'],
        textDecorationLine: 'underline',
    },
});

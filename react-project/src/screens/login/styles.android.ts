import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
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
        color: Colors.white,
        marginBottom: 12,
    },
    fieldsGroup: {
        width: '100%',
        gap: 12,
        marginBottom: 24,
    },
    error: {
        width: '100%',
        fontSize: 13,
        color: Colors.semantic.error.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    linkRow: {
        marginTop: 16,
        paddingVertical: 4,
    },
    link: {
        fontSize: 14,
        color: Colors.whiteAlpha['55'],
        textDecorationLine: 'underline',
    },
    checking: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

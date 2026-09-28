import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    checking: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.background,
    },
    formPanel: {
        backgroundColor: Colors.background,
    },
    formScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    formContent: {
        width: '100%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 20,
        color: Colors.primaryLight,
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
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
        color: Colors.error,
        marginBottom: 12,
    },
    success: {
        width: '100%',
        fontSize: 13,
        color: Colors.success,
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

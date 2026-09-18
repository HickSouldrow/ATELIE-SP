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
        color: Colors.brandLight,
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
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

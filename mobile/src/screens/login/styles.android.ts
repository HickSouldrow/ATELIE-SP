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
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
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
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 24,
        color: Colors.brandLight,
        marginBottom: 18,
        textAlign: 'center',
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
});

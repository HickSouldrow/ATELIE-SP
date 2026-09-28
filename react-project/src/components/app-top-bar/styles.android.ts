import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteAlpha['08'],
    },
    titleGroup: {
        flex: 1,
    },
    title: {
        fontFamily: Fonts.displayItalic,
        fontSize: 20,
        color: Colors.text,
    },
    subtitle: {
        fontSize: 12,
        color: Colors.textSubtle,
        marginTop: 1,
    },
});

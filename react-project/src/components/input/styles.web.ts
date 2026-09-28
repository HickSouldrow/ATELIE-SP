import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['12'],
        backgroundColor: Colors.whiteAlpha['06'],
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        gap: 10,
    },
    wrapperFocused: {
        borderColor: Colors.primaryLight,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.text,
        // A borda do wrapper já indica o foco.
        outlineStyle: 'none',
    } as any,
    wrapperError: {
        borderColor: Colors.errorStrong,
    },
    eyeButton: {
        cursor: 'pointer',
    } as any,
});

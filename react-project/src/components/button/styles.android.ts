import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 48,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    primary: {
        backgroundColor: Colors.primary,
        elevation: 2,
    },
    primaryPressed: {
        backgroundColor: Colors.primaryPressed,
    },
    secondary: {
        backgroundColor: Colors.whiteAlpha['06'],
        borderWidth: 1,
        borderColor: Colors.borderStrong,
    },
    secondaryPressed: {
        backgroundColor: Colors.whiteAlpha['12'],
    },
    danger: {
        backgroundColor: Colors.errorSoft,
        borderWidth: 1,
        borderColor: Colors.errorStrong,
    },
    dangerPressed: {
        backgroundColor: Colors.errorPressed,
    },
    disabled: {
        opacity: 0.5,
    },
    title: {
        color: Colors.onPrimary,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
});

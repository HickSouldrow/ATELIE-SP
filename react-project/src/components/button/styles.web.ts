import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        borderRadius: 6,
        backgroundColor: Colors.btnPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    pressed: {
        backgroundColor: Colors.btnPrimaryPressed,
    },
    disabled: {
        opacity: 0.5,
    },
    title: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
});

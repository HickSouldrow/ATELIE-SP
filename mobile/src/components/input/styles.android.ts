import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 52,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['12'],
        backgroundColor: Colors.whiteAlpha['06'],
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.white,
        paddingVertical: 0,
    },
});

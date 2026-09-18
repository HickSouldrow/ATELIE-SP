import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    box: {
        maxWidth: 480,
        borderRadius: 10,
        borderTopWidth: 3,
        borderTopColor: Colors.brand,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: Colors.whiteAlpha['10'],
        borderRightColor: Colors.whiteAlpha['10'],
        borderBottomColor: Colors.whiteAlpha['10'],
        backgroundColor: Colors.surface,
        overflow: 'hidden',
    },
    boxMobile: {
        width: '100%',
    },
    inner: {
        alignItems: 'center',
    },
    innerMobile: {
        paddingVertical: 28,
        paddingHorizontal: 22,
    },
    content: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
        marginTop: 20,
    },
    icon: {
        width: 52,
        height: 52,
    },
});

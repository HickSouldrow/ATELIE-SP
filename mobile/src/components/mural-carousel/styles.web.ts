import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 22,
        paddingBottom: 6,
    },
    heading: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.white,
        paddingHorizontal: 20,
    },
    subheading: {
        fontSize: 13,
        color: Colors.whiteAlpha['45'],
        paddingHorizontal: 20,
        marginTop: 2,
        marginBottom: 16,
    },
    track: {
        paddingHorizontal: 20,
        gap: 14,
    },
    card: {
        width: 216,
        height: 140,
        borderRadius: 10,
        borderWidth: 1.5,
        overflow: 'hidden',
        backgroundColor: Colors.surface,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    captionScrim: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 10,
        paddingTop: 22,
        paddingBottom: 10,
    },
    caption: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.white,
    },
});

import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(6,2,3,0.6)',
    },
    backdropPressable: {
        flex: 1,
        cursor: 'default',
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 268,
        backgroundColor: Colors.surface,
        borderRightWidth: 1,
        borderRightColor: Colors.whiteAlpha['10'],
        paddingTop: 20,
        paddingBottom: 18,
        paddingHorizontal: 18,
    },
    edgeGlow: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
        paddingLeft: 6,
    },
    wordmark: {
        fontFamily: Fonts.displayItalic,
        fontSize: 18,
        color: Colors.white,
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    list: {
        gap: 4,
        paddingVertical: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 11,
        paddingHorizontal: 10,
        borderRadius: 6,
        cursor: 'pointer',
    },
    itemHovered: {
        backgroundColor: Colors.neonAlpha.cyan15,
    },
    itemLabel: {
        fontSize: 14,
        color: Colors.whiteAlpha['65'],
    },
    itemLabelHovered: {
        color: Colors.white,
    },
    footerNote: {
        fontSize: 11,
        color: Colors.whiteAlpha['30'],
        textAlign: 'center',
        paddingTop: 10,
    },
});

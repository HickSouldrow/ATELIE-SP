import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    // 'fixed' cobre a janela inteira. Com absoluteFill o overlay ficava
    // limitado à altura do Header (60px) e o drawer não aparecia.
    overlay: {
        position: 'fixed' as any,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.overlay['60'],
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
        backgroundColor: Colors.brandAlpha["18"],
    },
    itemActive: {
        backgroundColor: Colors.brandAlpha["18"],
        borderLeftWidth: 2,
        borderLeftColor: Colors.brandLight,
    },
    itemLabel: {
        fontSize: 14,
        color: Colors.whiteAlpha['65'],
    },
    itemLabelHovered: {
        color: Colors.white,
    },
    itemLabelActive: {
        color: Colors.white,
        fontWeight: '600',
    },
    footerNote: {
        fontSize: 11,
        color: Colors.whiteAlpha['30'],
        textAlign: 'center',
        paddingTop: 10,
    },
});

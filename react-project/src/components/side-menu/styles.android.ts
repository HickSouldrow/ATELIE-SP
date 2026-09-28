import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.overlay['60'],
    },
    backdropPressable: {
        flex: 1,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 272,
        backgroundColor: Colors.surface,
        borderRightWidth: 1,
        borderRightColor: Colors.whiteAlpha['10'],
        elevation: 16,
    },
    safeArea: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 16,
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
        width: 34,
        height: 34,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        gap: 4,
        paddingVertical: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    itemActive: {
        backgroundColor: Colors.brandAlpha["18"],
    },
    itemLabel: {
        fontSize: 15,
        color: Colors.whiteAlpha['65'],
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

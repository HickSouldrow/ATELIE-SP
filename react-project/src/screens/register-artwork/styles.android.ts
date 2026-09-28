import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    flex: {
        flex: 1,
    },

    // ---------- Início ----------
    introContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 32,
        gap: 20,
    },
    heroCard: {
        alignItems: 'center',
        padding: 24,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderTopWidth: 3,
        borderTopColor: Colors.accent,
    },
    heroIcon: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentSoft,
        marginBottom: 14,
    },
    heroTitle: {
        fontFamily: Fonts.displayItalic,
        fontSize: 22,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 6,
    },
    heroText: {
        fontSize: 14,
        lineHeight: 21,
        color: Colors.textMuted,
        textAlign: 'center',
    },
    steps: {
        gap: 10,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 14,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    stepNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primarySoft,
    },
    stepNumberText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.primaryLight,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
    },
    stepText: {
        fontSize: 13,
        lineHeight: 18,
        color: Colors.textSubtle,
        marginTop: 2,
    },
    noticeBox: {
        flexDirection: 'row',
        gap: 12,
        padding: 14,
        borderRadius: 12,
        backgroundColor: Colors.errorSoft,
        borderWidth: 1,
        borderColor: Colors.errorStrong,
    },
    noticeTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    noticeText: {
        fontSize: 13,
        lineHeight: 19,
        color: Colors.textMuted,
        marginBottom: 6,
    },
    linkText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primaryLight,
        textDecorationLine: 'underline',
        paddingVertical: 4,
    },

    // ---------- Câmera ----------
    cameraScreen: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    camera: {
        ...StyleSheet.absoluteFill,
    },
    cameraTopBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    cameraIconButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mediaControl,
    },
    cameraHint: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: Colors.mediaControl,
        overflow: 'hidden',
    },
    cameraError: {
        position: 'absolute',
        left: 20,
        right: 20,
        padding: 12,
        borderRadius: 10,
        backgroundColor: Colors.errorSoft,
        borderWidth: 1,
        borderColor: Colors.errorStrong,
    },
    cameraErrorText: {
        fontSize: 13,
        color: Colors.error,
        textAlign: 'center',
    },
    cameraBottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        paddingTop: 24,
        backgroundColor: Colors.mediaBar,
    },
    shutterOuter: {
        width: 78,
        height: 78,
        borderRadius: 39,
        borderWidth: 4,
        borderColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mediaShutterRing,
    },
    shutterInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.white,
    },
    shutterPressed: {
        transform: [{ scale: 0.94 }],
    },
    shutterDisabled: {
        opacity: 0.6,
    },

    // ---------- Prévia ----------
    previewBody: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        gap: 14,
    },
    previewFrame: {
        flexShrink: 1,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: Colors.black,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    previewImage: {
        width: '100%',
        maxHeight: '100%',
    },
    previewHint: {
        fontSize: 14,
        color: Colors.textMuted,
        textAlign: 'center',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    actionButton: {
        flex: 1,
        width: 'auto',
    },

    // ---------- Detalhes ----------
    detailsContent: {
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 32,
        gap: 12,
    },
    photoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 12,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 4,
    },
    photoThumb: {
        width: 72,
        height: 72,
        borderRadius: 10,
        backgroundColor: Colors.surfaceRaised,
    },
    photoRowTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.textMuted,
        marginTop: 4,
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    locationCardReady: {
        borderColor: Colors.successStrong,
        backgroundColor: Colors.successSoft,
    },
    locationCardError: {
        alignItems: 'flex-start',
        borderColor: Colors.errorStrong,
        backgroundColor: Colors.errorSoft,
    },
    locationBody: {
        flex: 1,
    },
    locationText: {
        fontSize: 14,
        color: Colors.textMuted,
    },
    locationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    locationCoords: {
        fontSize: 12,
        color: Colors.textSubtle,
        marginTop: 2,
    },
    locationRefresh: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationErrorText: {
        fontSize: 13,
        lineHeight: 19,
        color: Colors.text,
    },
    locationActions: {
        flexDirection: 'row',
        gap: 18,
        marginTop: 4,
    },
    field: {
        gap: 6,
    },
    fieldError: {
        flex: 1,
        fontSize: 12,
        color: Colors.error,
    },
    fieldFooter: {
        flexDirection: 'row',
        gap: 8,
    },
    counter: {
        fontSize: 12,
        color: Colors.textSubtle,
    },
    textArea: {
        minHeight: 110,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.whiteAlpha['12'],
        backgroundColor: Colors.whiteAlpha['06'],
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 16,
        color: Colors.text,
    },
    textAreaFocused: {
        borderColor: Colors.primaryLight,
    },
    textAreaError: {
        borderColor: Colors.errorStrong,
    },
    saveError: {
        fontSize: 13,
        color: Colors.error,
        textAlign: 'center',
    },
});

import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 110,
        gap: 10,
    },
    listEmpty: {
        flexGrow: 1,
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 10,
        borderRadius: 14,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    rowPhoto: {
        width: 76,
        height: 76,
        borderRadius: 10,
        backgroundColor: Colors.surfaceRaised,
    },
    rowBody: {
        flex: 1,
        gap: 4,
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    rowMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    rowMetaText: {
        flex: 1,
        fontSize: 12.5,
        color: Colors.textMuted,
    },
    deleteButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyCard: {
        alignItems: 'center',
        gap: 10,
        padding: 24,
        borderRadius: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderTopWidth: 3,
        borderTopColor: Colors.accent,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentSoft,
        marginBottom: 4,
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.text,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 13.5,
        lineHeight: 20,
        color: Colors.textMuted,
        textAlign: 'center',
        marginBottom: 8,
    },

    fab: {
        position: 'absolute',
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: Colors.accent,
        elevation: 6,
    },
});

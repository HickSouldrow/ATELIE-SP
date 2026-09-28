import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // Espaço extra para o bitmap não cortar a borda maior do selecionado.
        padding: 2,
    },
    bubble: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: Colors.accent,
        backgroundColor: Colors.surfaceRaised,
        overflow: 'hidden',
    },
    bubbleSelected: {
        width: 62,
        height: 62,
        borderRadius: 31,
        borderColor: Colors.highlight,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    fallback: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accentSoft,
    },
    // Triângulo abaixo da bolha, apontando para o local exato.
    pointer: {
        width: 0,
        height: 0,
        marginTop: -1,
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.accent,
    },
    pointerSelected: {
        borderTopColor: Colors.highlight,
    },
});

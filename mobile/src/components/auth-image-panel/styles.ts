import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: Colors.background,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        opacity: 0.55,
    },
    edgeFade: {
        ...StyleSheet.absoluteFillObject,
    },
});

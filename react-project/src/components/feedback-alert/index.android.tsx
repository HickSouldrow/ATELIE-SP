import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { FeedbackAlertProps } from './types';

const FeedbackAlertAndroid: React.FC<FeedbackAlertProps> = ({
    visible,
    type = 'success',
    title,
    message,
    confirmText = 'Ok',
    onConfirm,
}) => {
    const scale = useRef(new Animated.Value(0.85)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 7,
                    tension: 60,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            scale.setValue(0.85);
            opacity.setValue(0);
        }
    }, [visible]);

    const isSuccess = type === 'success';
    const accentColor = isSuccess ? Colors.semantic.success.text : Colors.semantic.error.text;
    const iconBg = isSuccess ? Colors.semantic.success.bg : Colors.semantic.error.bg;
    const iconName = isSuccess ? 'checkmark-circle' : 'close-circle';

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onConfirm}>
            <View style={styles.backdrop}>
                <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
                    <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
                        <Ionicons name={iconName} size={40} color={accentColor} />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    {!!message && <Text style={styles.message}>{message}</Text>}

                    <Button title={confirmText} onPress={onConfirm} style={styles.button} />
                </Animated.View>
            </View>
        </Modal>
    );
};

export { FeedbackAlertAndroid as FeedbackAlert };
export default FeedbackAlertAndroid;

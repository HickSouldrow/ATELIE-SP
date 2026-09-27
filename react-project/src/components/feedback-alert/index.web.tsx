import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

import { Colors } from '@/constants/colors';

import { FeedbackAlertProps } from './types';

const FeedbackAlertWeb: React.FC<FeedbackAlertProps> = ({
    visible,
    type = 'success',
    title,
    message,
    confirmText = 'Ok',
    onConfirm,
}) => {
    const isOpenRef = useRef(false);

    useEffect(() => {
        if (visible && !isOpenRef.current) {
            isOpenRef.current = true;

            Swal.fire({
                icon: type,
                title,
                text: message,
                confirmButtonText: confirmText,
                background: Colors.surface,
                color: Colors.txtPrimary,
                confirmButtonColor: Colors.brand,
                iconColor:
                    type === 'success' ? Colors.semantic.success.text : Colors.semantic.error.text,
            }).then(() => {
                isOpenRef.current = false;
                onConfirm();
            });
        }

        if (!visible) {
            isOpenRef.current = false;
        }
    }, [visible]);

    return null;
};

export { FeedbackAlertWeb as FeedbackAlert };
export default FeedbackAlertWeb;

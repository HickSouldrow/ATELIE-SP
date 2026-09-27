export type FeedbackAlertType = 'success' | 'error';

export type FeedbackAlertProps = {
    visible: boolean;
    type?: FeedbackAlertType;
    title: string;
    message?: string;
    confirmText?: string;
    onConfirm: () => void;
};

import React from 'react';
import { Platform } from 'react-native';

import FeedbackAlertAndroid from './index.android';
import FeedbackAlertWeb from './index.web';
import { FeedbackAlertProps } from './types';

const FeedbackAlertImplementation = Platform.select({
    android: FeedbackAlertAndroid,
    ios: FeedbackAlertAndroid,
    web: FeedbackAlertWeb,
    default: FeedbackAlertWeb,
}) as React.FC<FeedbackAlertProps>;

export { FeedbackAlertImplementation as FeedbackAlert };
export default FeedbackAlertImplementation;

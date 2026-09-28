import React from 'react';
import { Platform } from 'react-native';

import AndroidOnlyNoticeAndroid from './index.android';
import AndroidOnlyNoticeWeb from './index.web';
import { AndroidOnlyNoticeProps } from './types';

const AndroidOnlyNoticeImplementation = Platform.select({
    android: AndroidOnlyNoticeAndroid,
    ios: AndroidOnlyNoticeAndroid,
    web: AndroidOnlyNoticeWeb,
    default: AndroidOnlyNoticeWeb,
}) as React.FC<AndroidOnlyNoticeProps>;

export { AndroidOnlyNoticeImplementation as AndroidOnlyNotice };
export * from './types';

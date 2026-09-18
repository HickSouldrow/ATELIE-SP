import React from 'react';
import { Platform } from 'react-native';

import BoxLoginAndroid from './index.android';
import BoxLoginWeb from './index.web';
import { BoxLoginProps } from './types';

const BoxLoginImplementation = Platform.select({
    android: BoxLoginAndroid,
    ios: BoxLoginAndroid,
    web: BoxLoginWeb,
    default: BoxLoginWeb,
}) as React.FC<BoxLoginProps>;

export { BoxLoginImplementation as BoxLogin };
export * from './types';

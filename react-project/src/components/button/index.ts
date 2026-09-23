import React from 'react';
import { Platform } from 'react-native';

import ButtonAndroid from './index.android';
import ButtonWeb from './index.web';
import { ButtonProps } from './types';

const ButtonImplementation = Platform.select({
    android: ButtonAndroid,
    ios: ButtonAndroid,
    web: ButtonWeb,
    default: ButtonWeb,
}) as React.FC<ButtonProps>;

export { ButtonImplementation as Button };
export * from './types';

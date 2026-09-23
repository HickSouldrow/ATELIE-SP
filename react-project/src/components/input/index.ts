import React from 'react';
import { Platform } from 'react-native';

import InputAndroid from './index.android';
import InputWeb from './index.web';
import { InputProps } from './types';

const InputImplementation = Platform.select({
    android: InputAndroid,
    ios: InputAndroid,
    web: InputWeb,
    default: InputWeb,
}) as React.FC<InputProps>;

export { InputImplementation as Input };
export * from './types';

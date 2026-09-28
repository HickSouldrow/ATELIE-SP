import React from 'react';
import { Platform } from 'react-native';

import AppTopBarAndroid from './index.android';
import AppTopBarWeb from './index.web';
import { AppTopBarProps } from './types';

const AppTopBarImplementation = Platform.select({
    android: AppTopBarAndroid,
    ios: AppTopBarAndroid,
    web: AppTopBarWeb,
    default: AppTopBarWeb,
}) as React.FC<AppTopBarProps>;

export { AppTopBarImplementation as AppTopBar };
export * from './types';

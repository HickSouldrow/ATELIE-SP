import React from 'react';
import { Platform } from 'react-native';

import AuthBackgroundAndroid from './index.android';
import AuthBackgroundWeb from './index.web';
import { AuthBackgroundProps } from './types';

const AuthBackgroundImplementation = Platform.select({
    android: AuthBackgroundAndroid,
    ios: AuthBackgroundAndroid,
    web: AuthBackgroundWeb,
    default: AuthBackgroundWeb,
}) as React.FC<AuthBackgroundProps>;

export { AuthBackgroundImplementation as AuthBackground };
export * from './types';

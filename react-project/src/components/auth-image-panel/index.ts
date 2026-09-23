import React from 'react';
import { Platform } from 'react-native';

import AuthImagePanelAndroid from './index.android';
import AuthImagePanelWeb from './index.web';
import { AuthImagePanelProps } from './types';

const AuthImagePanelImplementation = Platform.select({
    android: AuthImagePanelAndroid,
    ios: AuthImagePanelAndroid,
    web: AuthImagePanelWeb,
    default: AuthImagePanelWeb,
}) as React.FC<AuthImagePanelProps>;

export { AuthImagePanelImplementation as AuthImagePanel };
export * from './types';

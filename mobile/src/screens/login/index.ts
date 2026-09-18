import React from 'react';
import { Platform } from 'react-native';

import LoginAndroid from './index.android';
import LoginWeb from './index.web';

const LoginImplementation = Platform.select({
    android: LoginAndroid,
    ios: LoginAndroid,
    web: LoginWeb,
    default: LoginWeb,
}) as React.FC;

export { LoginImplementation as LoginScreen };
export default LoginImplementation;

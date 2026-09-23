import React from 'react';
import { Platform } from 'react-native';

import RegisterAndroid from './index.android';
import RegisterWeb from './index.web';

const RegisterImplementation = Platform.select({
    android: RegisterAndroid,
    ios: RegisterAndroid,
    web: RegisterWeb,
    default: RegisterWeb,
}) as React.FC;

export { RegisterImplementation as RegisterScreen };
export default RegisterImplementation;

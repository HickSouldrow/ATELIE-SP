import React from 'react';
import { Platform } from 'react-native';

import AboutAndroid from './index.android';
import AboutWeb from './index.web';

const AboutImplementation = Platform.select({
    android: AboutAndroid,
    ios: AboutAndroid,
    web: AboutWeb,
    default: AboutWeb,
}) as React.FC;

export { AboutImplementation as AboutScreen };
export default AboutImplementation;

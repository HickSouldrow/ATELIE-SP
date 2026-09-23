import React from 'react';
import { Platform } from 'react-native';

import DashboardAndroid from './index.android';
import DashboardWeb from './index.web';

const DashboardImplementation = Platform.select({
    android: DashboardAndroid,
    ios: DashboardAndroid,
    web: DashboardWeb,
    default: DashboardWeb,
}) as React.FC;

export { DashboardImplementation as DashboardScreen };
export default DashboardImplementation;

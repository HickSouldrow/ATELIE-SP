import React from 'react';
import { Platform } from 'react-native';

import SideMenuAndroid from './index.android';
import SideMenuWeb from './index.web';
import { SideMenuProps } from './types';

const SideMenuImplementation = Platform.select({
    android: SideMenuAndroid,
    ios: SideMenuAndroid,
    web: SideMenuWeb,
    default: SideMenuWeb,
}) as React.FC<SideMenuProps>;

export { SideMenuImplementation as SideMenu };
export default SideMenuImplementation;
export * from './types';

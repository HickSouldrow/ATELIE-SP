import React from 'react';
import { Platform } from 'react-native';

import MyArtworksAndroid from './index.android';
import MyArtworksWeb from './index.web';

const MyArtworksImplementation = Platform.select({
    android: MyArtworksAndroid,
    ios: MyArtworksAndroid,
    web: MyArtworksWeb,
    default: MyArtworksWeb,
}) as React.FC;

export { MyArtworksImplementation as MyArtworksScreen };
export default MyArtworksImplementation;

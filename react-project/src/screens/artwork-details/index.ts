import React from 'react';
import { Platform } from 'react-native';

import ArtworkDetailsAndroid from './index.android';
import ArtworkDetailsWeb from './index.web';

const ArtworkDetailsImplementation = Platform.select({
    android: ArtworkDetailsAndroid,
    ios: ArtworkDetailsAndroid,
    web: ArtworkDetailsWeb,
    default: ArtworkDetailsWeb,
}) as React.FC;

export { ArtworkDetailsImplementation as ArtworkDetailsScreen };
export default ArtworkDetailsImplementation;

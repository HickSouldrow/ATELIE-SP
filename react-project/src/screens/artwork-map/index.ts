import React from 'react';
import { Platform } from 'react-native';

import ArtworkMapAndroid from './index.android';
import ArtworkMapWeb from './index.web';

const ArtworkMapImplementation = Platform.select({
    android: ArtworkMapAndroid,
    ios: ArtworkMapAndroid,
    web: ArtworkMapWeb,
    default: ArtworkMapWeb,
}) as React.FC;

export { ArtworkMapImplementation as ArtworkMapScreen };
export default ArtworkMapImplementation;

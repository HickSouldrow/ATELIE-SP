import React from 'react';
import { Platform } from 'react-native';

import ArtworkMarkerAndroid from './index.android';
import ArtworkMarkerWeb from './index.web';
import { ArtworkMarkerProps } from './types';

const ArtworkMarkerImplementation = Platform.select({
    android: ArtworkMarkerAndroid,
    ios: ArtworkMarkerAndroid,
    web: ArtworkMarkerWeb,
    default: ArtworkMarkerWeb,
}) as React.FC<ArtworkMarkerProps>;

export { ArtworkMarkerImplementation as ArtworkMarker };
export * from './types';

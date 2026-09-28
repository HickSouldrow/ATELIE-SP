import React from 'react';
import { Platform } from 'react-native';

import RegisterArtworkAndroid from './index.android';
import RegisterArtworkWeb from './index.web';

const RegisterArtworkImplementation = Platform.select({
    android: RegisterArtworkAndroid,
    ios: RegisterArtworkAndroid,
    web: RegisterArtworkWeb,
    default: RegisterArtworkWeb,
}) as React.FC;

export { RegisterArtworkImplementation as RegisterArtworkScreen };
export default RegisterArtworkImplementation;

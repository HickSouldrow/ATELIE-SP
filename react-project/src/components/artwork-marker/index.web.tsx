import React from 'react';

import { ArtworkMarkerProps } from './types';

// O mapa nativo (react-native-maps) só existe no app.
const ArtworkMarkerWeb: React.FC<ArtworkMarkerProps> = () => null;

export { ArtworkMarkerWeb as ArtworkMarker };
export default ArtworkMarkerWeb;

import React from 'react';

import { AndroidOnlyNotice } from '@/components/android-only-notice';

const ArtworkMapWeb: React.FC = () => (
    <AndroidOnlyNotice
        icon="map-outline"
        title="Mapa de obras"
        description="O mapa mostra as obras fotografadas pelo app, cada uma no lugar onde foi registrada. Abra o AteliêSP no Android para ver e registrar."
    />
);

export default ArtworkMapWeb;

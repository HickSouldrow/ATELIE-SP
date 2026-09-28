import React from 'react';

import { AndroidOnlyNotice } from '@/components/android-only-notice';

const MyArtworksWeb: React.FC = () => (
    <AndroidOnlyNotice
        icon="images-outline"
        title="Minhas obras"
        description="As obras que você registra ficam guardadas no seu celular, junto com as fotos. Abra o AteliêSP no Android para ver e gerenciar a sua coleção."
    />
);

export default MyArtworksWeb;

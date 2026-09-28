import React from 'react';

import { AndroidOnlyNotice } from '@/components/android-only-notice';

const RegisterArtworkWeb: React.FC = () => (
    <AndroidOnlyNotice
        icon="camera-outline"
        title="Registrar obra"
        description="Fotografar uma obra usa a câmera e o GPS do celular. Abra o AteliêSP no Android para registrar murais e grafites pela cidade."
    />
);

export default RegisterArtworkWeb;

import React from 'react';

import { AndroidOnlyNotice } from '@/components/android-only-notice';

const ArtworkDetailsWeb: React.FC = () => (
    <AndroidOnlyNotice
        icon="image-outline"
        title="Detalhes da obra"
        description="As obras e as fotos ficam guardadas no celular de quem registrou. Abra o AteliêSP no Android para ver os detalhes."
    />
);

export default ArtworkDetailsWeb;

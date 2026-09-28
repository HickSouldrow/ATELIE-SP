export interface Artwork {
    id: string;
    userId: string;
    // Nome do autor guardado junto para aparecer no mapa sem consultar a API.
    username: string;
    title: string;
    description: string;
    // Caminho da foto na pasta de documentos do app (file://...).
    photoUri: string;
    latitude: number;
    longitude: number;
    // Endereço aproximado (geocodificação reversa); pode faltar se falhar.
    address: string | null;
    // Data de registro em ISO 8601.
    createdAt: string;
}

export type NewArtwork = Omit<Artwork, 'id' | 'photoUri' | 'createdAt'> & {
    // Foto recém-tirada, ainda no cache da câmera.
    tempPhotoUri: string;
};

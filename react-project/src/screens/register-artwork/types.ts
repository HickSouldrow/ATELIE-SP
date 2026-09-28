// intro → camera → preview → details (localização + título/descrição)
export type RegisterArtworkStep = 'intro' | 'camera' | 'preview' | 'details';

export type CapturedPhoto = {
    uri: string;
    width: number;
    height: number;
};

// "blocked" = o usuário negou e marcou "não perguntar de novo":
// só dá pra liberar pelas configurações do aparelho.
export type PermissionIssue = 'denied' | 'blocked';

export type Coordinates = {
    latitude: number;
    longitude: number;
};

export type LocationState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'ready'; coords: Coordinates; address: string | null }
    | {
          status: 'error';
          reason: PermissionIssue | 'services-off' | 'unavailable';
          message: string;
      };

export type ArtworkFormErrors = {
    title?: string;
    description?: string;
};

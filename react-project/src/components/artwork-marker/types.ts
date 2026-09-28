import { Artwork } from '@/@types/artwork';

export type ArtworkMarkerProps = {
    artwork: Artwork;
    selected?: boolean;
    onPress?: () => void;
};

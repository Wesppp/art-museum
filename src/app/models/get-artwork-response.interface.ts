import { Artwork } from './artwork.interface';

export interface GetArtworkResponse {
  data: Artwork;
  config: {
    iiif_url: string;
  };
}

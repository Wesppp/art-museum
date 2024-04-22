import { Artwork } from '@models/artwork.interface';

export interface GetArtworksResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  };
  data: Artwork[];
  config: {
    iiif_url: string;
  };
}

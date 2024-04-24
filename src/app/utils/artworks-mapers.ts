import { Artwork } from '@models/artwork.interface';
import { GetArtworkResponse } from '@models/get-artwork-response.interface';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';

export function artworksResponseMapper(
  res: GetArtworksResponse
): GetArtworksResponse {
  const iiifUrl = res.config.iiif_url;
  const artworks: Artwork[] = res.data.map((artwork: Artwork) => ({
    ...artwork,
    image_url: `${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`,
  }));

  return {
    ...res,
    data: artworks,
  };
}

export function artworkResponseMapper(res: GetArtworkResponse): Artwork {
  const iiifUrl = res.config.iiif_url;
  const imageId = res.data.image_id;

  return {
    ...res.data,
    image_url: `${iiifUrl}/${imageId}/full/843,/0/default.jpg`,
  };
}

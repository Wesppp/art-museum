import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import {
  artworkResponseMapper,
  artworksResponseMapper,
} from './artworks-mapers';
import { GetArtworkResponse } from '@models/get-artwork-response.interface';
import {
  GET_ARTWORK_RESPONSE,
  GET_MAPPED_ARTWORK_RESPONSE,
  MOCK_GET_ARTWORKS_RESPONSE,
  MOCK_GET_MAPPED_ARTWORKS_RESPONSE,
} from '@constants/mock-data';

describe('artworksResponseMapper', () => {
  it('should map artworks response correctly', () => {
    const mockResponse: GetArtworksResponse = MOCK_GET_ARTWORKS_RESPONSE;

    const mappedResponse = artworksResponseMapper(mockResponse);

    expect(mappedResponse).toEqual(MOCK_GET_MAPPED_ARTWORKS_RESPONSE);
  });
});

describe('artworkResponseMapper', () => {
  it('should map artwork response correctly', () => {
    const mockResponse: GetArtworkResponse = GET_ARTWORK_RESPONSE;

    const mappedArtwork = artworkResponseMapper(mockResponse);

    expect(mappedArtwork).toEqual(GET_MAPPED_ARTWORK_RESPONSE);
  });
});

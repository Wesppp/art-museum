import { GetArtworkResponse } from './../models/get-artwork-response.interface';
import { Artwork } from '@models/artwork.interface';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';

export const MOCK_GET_ARTWORKS_RESPONSE: GetArtworksResponse = {
  pagination: {
    total: 10,
    limit: 5,
    offset: 0,
    total_pages: 2,
    current_page: 1,
    next_url: 'https://example.com/next_page',
  },
  data: [
    {
      id: 1,
      title: 'Artwork 1',
      thumbnail: {
        lqip: 'https://example.com/thumbnail1.jpg',
        alt_text: 'Thumbnail for Artwork 1',
      },
      place_of_origin: 'Origin 1',
      description: 'Description for Artwork 1',
      short_description: 'Short description for Artwork 1',
      artist_title: 'Artist 1',
      date_start: 1800,
      date_end: 1850,
      image_url: 'https://example.com/image1.jpg',
      image_id: 'image1',
    },
  ],
  config: {
    iiif_url: 'https://example.com/iiif',
  },
};

export const MOCK_GET_MAPPED_ARTWORKS_RESPONSE = {
  ...MOCK_GET_ARTWORKS_RESPONSE,
  data: [
    {
      ...MOCK_GET_ARTWORKS_RESPONSE.data[0],
      image_url: 'https://example.com/iiif/image1/full/843,/0/default.jpg',
    },
  ],
};

export const MOCK_ARTWORK: Artwork = {
  id: 1,
  title: 'Artwork 1',
  thumbnail: {
    lqip: 'https://example.com/thumbnail1.jpg',
    alt_text: 'Thumbnail for Artwork 1',
  },
  place_of_origin: 'Origin 1',
  description: 'Description for Artwork 1',
  short_description: 'Short description for Artwork 1',
  artist_title: 'Artist 1',
  date_start: 1800,
  date_end: 1850,
  image_url: 'https://example.com/image1.jpg',
  image_id: 'image1',
};

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: 'Artwork 1',
    thumbnail: {
      lqip: 'https://example.com/thumbnail1.jpg',
      alt_text: 'Thumbnail for Artwork 1',
    },
    place_of_origin: 'Origin 1',
    description: 'Description for Artwork 1',
    short_description: 'Short description for Artwork 1',
    artist_title: 'Artist 1',
    date_start: 1800,
    date_end: 1850,
    image_url: 'https://example.com/image1.jpg',
    image_id: 'image1',
  },
  {
    id: 2,
    title: 'Artwork 2',
    thumbnail: {
      lqip: 'https://example.com/thumbnail2.jpg',
      alt_text: 'Thumbnail for Artwork 2',
    },
    place_of_origin: 'Origin 2',
    description: 'Description for Artwork 2',
    short_description: 'Short description for Artwork 2',
    artist_title: 'Artist 2',
    date_start: 1700,
    date_end: 1750,
    image_url: 'https://example.com/image2.jpg',
    image_id: 'image2',
  },
];

export const GET_ARTWORK_RESPONSE: GetArtworkResponse = {
  data: {
    id: 1,
    title: 'Artwork 1',
    thumbnail: {
      lqip: 'lqip1',
      alt_text: 'Thumbnail 1',
    },
    place_of_origin: 'Origin 1',
    description: 'Description 1',
    short_description: 'Short Description 1',
    artist_title: 'Artist 1',
    date_start: 1800,
    date_end: 1850,
    image_url: 'image_url1',
    image_id: 'image_id1',
  },
  config: {
    iiif_url: 'iiif_url',
  },
};

export const GET_MAPPED_ARTWORK_RESPONSE: Artwork = {
  ...GET_ARTWORK_RESPONSE.data,
  image_url: 'iiif_url/image_id1/full/843,/0/default.jpg',
};

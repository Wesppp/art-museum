export interface Artwork {
  id: number;
  title: string;
  thumbnail: {
    lqip: string;
    alt_text: string;
  };
  place_of_origin: string;
  description: string;
  short_description: string;
  artist_title: string;
}

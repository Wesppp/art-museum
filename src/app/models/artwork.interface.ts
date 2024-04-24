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
  date_start: number;
  date_end: number;
  image_url: string;
  image_id: string;
}

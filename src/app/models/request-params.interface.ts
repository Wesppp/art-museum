export interface RequestParams {
  q?: string;
  limit?: number;
  page?: number;
  sort?: string;
  direction?: string;
  [key: string]: string | number | undefined;
}

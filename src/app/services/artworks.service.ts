import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  constructor(private readonly http: HttpClient) {}

  public getArtworks(): Observable<GetArtworksResponse> {
    return this.http.get<GetArtworksResponse>(`${environment.apiUrl}/artworks`);
  }
}

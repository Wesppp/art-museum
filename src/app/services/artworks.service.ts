import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, finalize, tap } from 'rxjs';

import { environment } from '@environments/environment.development';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { LoadingsService } from './loadings.service';
import { Loadings } from '@enums/loadings.enum';
import { ARTWORK_REQEST_FIELDS } from '@constants/artwork-request-fields';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingsService
  ) {}

  public getArtworks(
    page: number,
    title: string = ''
  ): Observable<GetArtworksResponse> {
    return this.http
      .get<GetArtworksResponse>(
        `${environment.apiUrl}/artworks/search?q=${title}&limit=3&page=${page}&fields=${ARTWORK_REQEST_FIELDS}`
      )
      .pipe(
        tap(() => this.loadingService.addLoading(Loadings.ALL_ARTWORKS)),
        finalize(() => this.loadingService.removeLoading(Loadings.ALL_ARTWORKS))
      );
  }
}

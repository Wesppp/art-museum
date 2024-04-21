import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, finalize, tap } from 'rxjs';

import { environment } from '@environments/environment.development';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { LoadingsService } from './loadings.service';
import { Loadings } from '@enums/loadings.enum';
import { ARTWORK_REQEST_FIELDS } from '@constants/artwork-request-fields';
import { RequestParams } from '@models/request-params.interface';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingsService
  ) {}

  public getArtworks(params?: RequestParams): Observable<GetArtworksResponse> {
    let queryParams: HttpParams = new HttpParams();

    for (const key in params) {
      queryParams = params[key]
        ? queryParams.set(key, params[key] as string)
        : queryParams;
    }

    return this.http
      .get<GetArtworksResponse>(
        `${environment.apiUrl}/artworks/search?fields=${ARTWORK_REQEST_FIELDS}&limit=3`,
        {
          params: queryParams,
        }
      )
      .pipe(
        tap(() => this.loadingService.addLoading(Loadings.ALL_ARTWORKS)),
        finalize(() => this.loadingService.removeLoading(Loadings.ALL_ARTWORKS))
      );
  }
}

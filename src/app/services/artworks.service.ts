import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, finalize, forkJoin, map, of, tap } from 'rxjs';

import { environment } from '@environments/environment.development';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { LoadingsService } from './loadings.service';
import { Loadings } from '@enums/loadings.enum';
import { ARTWORK_REQEST_FIELDS } from '@constants/artwork-request-fields';
import { RequestParams } from '@models/request-params.interface';
import { Artwork } from '@models/artwork.interface';
import { LocalStorage } from '@enums/local-storage.enum';
import { GetArtworkResponse } from '@models/get-artwork-response.interface';
import {
  artworkResponseMapper,
  artworksResponseMapper,
} from '@utils/artworks-mapers';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingsService,
    private readonly localStorageService: LocalStorageService
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
        map(artworksResponseMapper),
        tap(() => this.loadingService.addLoading(Loadings.ALL_ARTWORKS)),
        finalize(() => this.loadingService.removeLoading(Loadings.ALL_ARTWORKS))
      );
  }

  public getArtworkById(id: string): Observable<Artwork> {
    return this.http
      .get<GetArtworkResponse>(
        `${environment.apiUrl}/artworks/${id}?fields=${ARTWORK_REQEST_FIELDS}`
      )
      .pipe(
        map(artworkResponseMapper),
        tap(() => this.loadingService.addLoading(Loadings.ARTWORK_DETAILS)),
        finalize(() =>
          this.loadingService.removeLoading(Loadings.ARTWORK_DETAILS)
        )
      );
  }

  public getFavortiesArtworks(): Observable<Artwork[]> {
    const favoritesArtworksIds: number[] =
      this.localStorageService.getStorageData(LocalStorage.FAVORITES);

    if (!favoritesArtworksIds.length) {
      return of([]);
    }

    return forkJoin<Artwork[]>(
      favoritesArtworksIds.map((id) =>
        this.http
          .get<GetArtworkResponse>(
            `${environment.apiUrl}/artworks/${id}?fields=${ARTWORK_REQEST_FIELDS}`
          )
          .pipe(
            map(artworkResponseMapper),
            tap(() => {
              if (
                !this.loadingService.checkLoadings([Loadings.FAVORIES_ARTWORKS])
              ) {
                this.loadingService.addLoading(Loadings.FAVORIES_ARTWORKS);
              }
            })
          )
      )
    ).pipe(
      finalize(() =>
        this.loadingService.removeLoading(Loadings.FAVORIES_ARTWORKS)
      )
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, finalize, tap } from 'rxjs';

import { environment } from '@environments/environment.development';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { LoadingsService } from './loadings.service';
import { Loadings } from '@enums/loadings.enum';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  constructor(
    private readonly http: HttpClient,
    private readonly loadingService: LoadingsService
  ) {}

  public getArtworksWithPagination(
    page: number
  ): Observable<GetArtworksResponse> {
    return this.http
      .get<GetArtworksResponse>(
        `${environment.apiUrl}/artworks?page=${page}&limit=3`
      )
      .pipe(
        tap(() => this.loadingService.addLoading(Loadings.ALL_ARTWORKS)),
        finalize(() => this.loadingService.removeLoading(Loadings.ALL_ARTWORKS))
      );
  }
}

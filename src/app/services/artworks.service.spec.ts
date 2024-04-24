import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment.development';
import { ArtworksService } from './artworks.service';
import { LoadingsService } from './loadings.service';
import { LocalStorageService } from './local-storage.service';
import { ARTWORK_REQEST_FIELDS } from '@constants/artwork-request-fields';
import { MOCK_ARTWORK, MOCK_GET_ARTWORKS_RESPONSE } from '@constants/mock-data';

describe('ArtworksService', () => {
  let service: ArtworksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtworksService, LoadingsService, LocalStorageService],
    });
    service = TestBed.inject(ArtworksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get artworks', () => {
    const mockResponse = MOCK_GET_ARTWORKS_RESPONSE;

    service.getArtworks().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/artworks/search?fields=${ARTWORK_REQEST_FIELDS}&limit=3`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get artwork by ID', () => {
    const mockArtworkId = '1';
    const mockResponse = MOCK_ARTWORK;

    service.getArtworkById(mockArtworkId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/artworks/${mockArtworkId}?fields=${ARTWORK_REQEST_FIELDS}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors when getting artworks', () => {
    service.getArtworks().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/artworks/search?fields=${ARTWORK_REQEST_FIELDS}&limit=3`
    );
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });
});

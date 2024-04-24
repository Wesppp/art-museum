import { Loadings } from '@enums/loadings.enum';
import { LoadingsService } from './loadings.service';

describe('LoadingsService', () => {
  let service: LoadingsService;

  beforeEach(() => {
    service = new LoadingsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a loading state', () => {
    const loadingName = Loadings.ALL_ARTWORKS;

    service.addLoading(loadingName);
    service.loadingState$.subscribe((loadings) => {
      expect(loadings).toContain(loadingName);
    });
  });

  it('should remove a loading state', () => {
    const loadingName = Loadings.ALL_ARTWORKS;

    service.addLoading(loadingName);
    service.removeLoading(loadingName);
    service.loadingState$.subscribe((loadings) => {
      expect(loadings).not.toContain(loadingName);
    });
  });

  it('should check if all loadings are present', () => {
    const loadingNames = [
      Loadings.ALL_ARTWORKS,
      Loadings.FAVORIES_ARTWORKS,
      Loadings.ARTWORK_DETAILS,
    ];

    loadingNames.forEach((name) => service.addLoading(name));

    const result = service.checkLoadings(loadingNames);

    expect(result).toBe(true);
  });

  it('should check if part of loadings are present', () => {
    const loadingNames = [
      Loadings.ALL_ARTWORKS,
      Loadings.FAVORIES_ARTWORKS,
      Loadings.ARTWORK_DETAILS,
    ];

    loadingNames.forEach((name) => service.addLoading(name));

    const result = service.checkLoadings([
      Loadings.ALL_ARTWORKS,
      Loadings.FAVORIES_ARTWORKS,
    ]);

    expect(result).toBe(true);
  });

  it('should check if loadings are not present', () => {
    const loadingNames = [Loadings.ALL_ARTWORKS, Loadings.ARTWORK_DETAILS];

    loadingNames.forEach((name) => service.addLoading(name));

    const result = service.checkLoadings([
      Loadings.ALL_ARTWORKS,
      Loadings.FAVORIES_ARTWORKS,
    ]);

    expect(result).toBe(false);
  });
});

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';

import { Artwork } from '@models/artwork.interface';
import { ArtworksService } from '@services/artworks.service';
import { LoadingsService } from '@services/loadings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Loadings } from '@enums/loadings.enum';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { ArtworkCardComponent } from '@components/artwork-card/artwork-card.component';

@Component({
  selector: 'app-favorites-artworks',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ArtworkCardComponent],
  templateUrl: './favorites-artworks.component.html',
  styleUrl: './favorites-artworks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesArtworksComponent implements OnInit {
  public favoritesArtworks!: Artwork[];

  public isFavoritesArtworksLoading: boolean = false;

  constructor(
    private readonly artworksService: ArtworksService,
    private readonly loadingsService: LoadingsService,
    private readonly destroyRef: DestroyRef,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.initializeListeners();
    this.initializeValues();
  }

  private initializeValues(): void {
    this.artworksService
      .getFavortiesArtworks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((favoritesArtworks: Artwork[]) => {
        this.favoritesArtworks = favoritesArtworks;

        this.cdr.markForCheck();
      });
  }

  private initializeListeners(): void {
    this.loadingsService.loadingState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isFavoritesArtworksLoading = this.loadingsService.checkLoadings([
          Loadings.FAVORIES_ARTWORKS,
        ]);
      });
  }

  public revomeFromFavorites(id: number): void {
    this.favoritesArtworks = this.favoritesArtworks.filter(
      (artwork: Artwork) => artwork.id !== id
    );
  }
}

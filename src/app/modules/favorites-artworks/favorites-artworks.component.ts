import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';

import { Artwork } from '@models/artwork.interface';
import { ArtworksService } from '@services/artworks.service';
import { LoadingsService } from '@services/loadings.service';
import { Loadings } from '@enums/loadings.enum';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { ArtworkCardComponent } from '@components/artwork-card/artwork-card.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-favorites-artworks',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ArtworkCardComponent],
  templateUrl: './favorites-artworks.component.html',
  styleUrl: './favorites-artworks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesArtworksComponent implements OnInit {
  favoritesArtworks: WritableSignal<Artwork[]> = signal<Artwork[]>([]);
  isFavoritesArtworksLoading: Signal<boolean> = computed(() => {
    this.loadingsService.loadingState();

    return this.loadingsService.checkLoadings([Loadings.FAVORIES_ARTWORKS]);
  });

  constructor(
    private readonly artworksService: ArtworksService,
    private readonly loadingsService: LoadingsService
  ) {
    effect(
      () => {
        const artId = this.artworksService.removedArtworkFromFavorites();

        if (artId) {
          this.favoritesArtworks.update((state) =>
            state
              ? state.filter((artwork: Artwork) => artwork.id !== artId)
              : state
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.artworksService
      .getFavortiesArtworks()
      .pipe(
        tap((favoritesArtworks: Artwork[]) =>
          this.favoritesArtworks.set(favoritesArtworks)
        )
      )
      .subscribe();
  }
}

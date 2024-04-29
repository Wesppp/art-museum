import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

import { Loadings } from '@enums/loadings.enum';
import { Artwork } from '@models/artwork.interface';
import { ArtworksService } from '@services/artworks.service';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { CheckUndefinedValuePipe } from 'app/pipes/check-undefined-value.pipe';
import { LoadingsService } from '@services/loadings.service';
import { AddToFavoritesBtnComponent } from '@components/add-to-favorites-btn/add-to-favorites-btn.component';
import { BtnBgColors } from '@enums/btn-bg-colors.enum';

@Component({
  selector: 'app-artwork-details',
  standalone: true,
  templateUrl: './artwork-details.component.html',
  styleUrl: './artwork-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LoadingSpinnerComponent,
    CheckUndefinedValuePipe,
    AddToFavoritesBtnComponent,
  ],
})
export class ArtworkDetailsComponent {
  id = input.required<string>();

  artwork: WritableSignal<Artwork | null> = signal<Artwork | null>(null);
  isArtworkLoading: Signal<boolean> = computed(() => {
    this.loadingsService.loadingState();

    return this.loadingsService.checkLoadings([Loadings.ARTWORK_DETAILS]);
  });

  protected btnBgColors = BtnBgColors;

  constructor(
    private readonly artworksService: ArtworksService,
    private readonly loadingsService: LoadingsService
  ) {
    effect(
      () => {
        const id = this.id();

        if (id) {
          this.artworksService
            .getArtworkById(id)
            .subscribe((artwork: Artwork) => {
              this.artwork.set(artwork);
            });
        }
      },
      { allowSignalWrites: true }
    );
  }
}

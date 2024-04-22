import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

import { Loadings } from '@enums/loadings.enum';
import { Artwork } from '@models/artwork.interface';
import { ArtworksService } from '@services/artworks.service';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { CheckUndefinedValuePipe } from 'app/pipes/check-undefined-value.pipe';
import { LocalStorageService } from '@services/local-storage.service';
import { LocalStorage } from '@enums/local-storage.enum';
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
export class ArtworkDetailsComponent implements OnInit {
  @Input() public set id(id: string) {
    this.artwork$ = this.artworksService.getArtworkById(id);
  }

  public artwork$!: Observable<Artwork>;

  public isArtworkLoading: boolean = false;
  protected btnBgColors = BtnBgColors;

  constructor(
    private readonly artworksService: ArtworksService,
    private readonly loadingsService: LoadingsService,
    private readonly destroyRef: DestroyRef,
    private readonly localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    this.initializeListeners();
  }

  private initializeListeners(): void {
    this.loadingsService.loadingState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isArtworkLoading = this.loadingsService.checkLoadings([
          Loadings.ARTWORK_DETAILS,
        ]);
      });
  }

  public addToFavorites(id: number): void {
    this.localStorageService.addElementToStorage<number>(
      LocalStorage.FAVORITES,
      id
    );
  }
}

import { LoadingsService } from './../../services/loadings.service';
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
  ],
})
export class ArtworkDetailsComponent implements OnInit {
  @Input() public set id(id: string) {
    this.artwork$ = this.artworksService.getArtworkById(id);
  }

  public artwork$!: Observable<Artwork>;

  public isArtworkLoading: boolean = false;

  constructor(
    private readonly artworksService: ArtworksService,
    private readonly loadingsService: LoadingsService,
    private readonly destroyRef: DestroyRef
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
}

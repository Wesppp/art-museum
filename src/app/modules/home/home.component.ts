import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable, debounceTime } from 'rxjs';

import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { ArtworksService } from '@services/artworks.service';
import { LoadingsService } from '@services/loadings.service';
import { Loadings } from '@enums/loadings.enum';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { ArtworkCardComponent } from '@components/artwork-card/artwork-card.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    ArtworkCardComponent,
    PaginatorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public artworks$!: Observable<GetArtworksResponse>;

  public page: number = 1;
  public isArtworksLoading: boolean = false;
  public searchText: string = '';

  public searchControl: FormControl = new FormControl<string>('');

  constructor(
    private readonly artworkService: ArtworksService,
    private readonly loadingsService: LoadingsService,
    private readonly destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.initializeListeners();

    this.artworks$ = this.artworkService.getArtworks(this.page);
  }

  private initializeListeners() {
    this.loadingsService.loadingState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isArtworksLoading = this.loadingsService.checkLoadings([
          Loadings.ALL_ARTWORKS,
        ]);
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((searchText: string): void => {
        this.searchText = searchText;

        this.changePage(1);
      });
  }

  public changePage(page: number): void {
    this.page = page;
    this.artworks$ = this.artworkService.getArtworks(page, this.searchText);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable, debounceTime, tap } from 'rxjs';

import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { ArtworksService } from '@services/artworks.service';
import { LoadingsService } from '@services/loadings.service';
import { Loadings } from '@enums/loadings.enum';
import { LoadingSpinnerComponent } from '@components/loading-spinner/loading-spinner.component';
import { ArtworkCardComponent } from '@components/artwork-card/artwork-card.component';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { SORT_ARTWORKS_OPTIONS } from '@constants/sort-artworks-options';
import { SortArtworksOptions } from '@models/sort-artworks-options.interface';
import { LocalStorage } from '@enums/local-storage.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    ArtworkCardComponent,
    PaginatorComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  artworks: WritableSignal<GetArtworksResponse | null> =
    signal<GetArtworksResponse | null>(null);
  isArtworksLoading: Signal<boolean> = computed(() => {
    this.loadingsService.loadingState();

    return this.loadingsService.checkLoadings([Loadings.ALL_ARTWORKS]);
  });
  searchText: WritableSignal<string> = signal<string>('');

  searchText$: Observable<string> = toObservable(this.searchText);

  sortArtworksOptions: SortArtworksOptions[] = SORT_ARTWORKS_OPTIONS;
  page: number = 1;
  sort: string = '';

  constructor(
    private readonly artworkService: ArtworksService,
    private readonly loadingsService: LoadingsService,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.initializeListeners();
    this.restorePageFromLocalStorage();
    this.initializeValues();
  }

  private initializeListeners() {
    this.searchText$
      .pipe(
        debounceTime(300),
        tap((searchText: string) => {
          this.searchText.set(searchText);
          this.changePage(1);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private initializeValues(): void {
    this.artworkService
      .getArtworks({ page: this.page })
      .pipe(tap((artworks) => this.artworks.set(artworks)))
      .subscribe();
  }

  changePage(page: number): void {
    this.page = page;
    this.artworkService
      .getArtworks({
        q: this.searchText(),
        sort: this.sort,
        page,
      })
      .pipe(tap((artworks) => this.artworks.set(artworks)))
      .subscribe();

    this.savePageToLocalStorage();
  }

  private savePageToLocalStorage(): void {
    localStorage.setItem(LocalStorage.CURRENT_PAGE, this.page.toString());
  }

  private restorePageFromLocalStorage(): void {
    const savedPage = localStorage.getItem(LocalStorage.CURRENT_PAGE);
    if (savedPage) {
      this.page = +savedPage;
    }
  }

  selectSortField(selectedValue: string): void {
    this.sort = selectedValue;

    this.changePage(1);
  }
}

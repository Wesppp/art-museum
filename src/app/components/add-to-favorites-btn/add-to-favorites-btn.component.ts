import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';

import { LocalStorageService } from '@services/local-storage.service';
import { LocalStorage } from '@enums/local-storage.enum';
import { BtnBgColors } from '@enums/btn-bg-colors.enum';
import { ArtworksService } from '@services/artworks.service';

@Component({
  selector: 'app-add-to-favorites-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-favorites-btn.component.html',
  styleUrl: './add-to-favorites-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToFavoritesBtnComponent implements OnInit {
  artworkId = input.required<number>();
  bgColor = input<BtnBgColors>(BtnBgColors.GRAY);

  favoritesArtworks: number[] = [];
  protected btnBgColors = BtnBgColors;

  constructor(
    private readonly artworkService: ArtworksService,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.favoritesArtworks = this.localStorageService.getStorageData<number[]>(
      LocalStorage.FAVORITES
    );
  }

  addToFavorites(id: number, event: MouseEvent): void {
    event.stopPropagation();

    if (this.favoritesArtworks.includes(id)) {
      this.favoritesArtworks = this.favoritesArtworks.filter((el) => el !== id);
      this.localStorageService.removeElementFromStorage(
        LocalStorage.FAVORITES,
        id
      );
      this.artworkService.removedArtworkFromFavorites.set(id);
    } else {
      this.favoritesArtworks = [...this.favoritesArtworks, id];
      this.localStorageService.addElementToStorage<number>(
        LocalStorage.FAVORITES,
        id
      );
    }
  }
}

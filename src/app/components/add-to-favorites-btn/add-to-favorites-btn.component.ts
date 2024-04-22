import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { LocalStorageService } from '@services/local-storage.service';
import { LocalStorage } from '@enums/local-storage.enum';
import { BtnBgColors } from '@enums/btn-bg-colors.enum';

@Component({
  selector: 'app-add-to-favorites-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-favorites-btn.component.html',
  styleUrl: './add-to-favorites-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToFavoritesBtnComponent implements OnInit {
  @Input({ required: true }) public artworkId!: number;
  @Input() public bgColor: BtnBgColors = BtnBgColors.GRAY;

  @Output() public revomeFromFavoritesEvent = new EventEmitter<number>();

  public favoritesArtworks: number[] = [];
  protected btnBgColors = BtnBgColors;

  public ngOnInit(): void {
    this.favoritesArtworks = this.localStorageService.getStorageData<number[]>(
      LocalStorage.FAVORITES
    );
  }

  constructor(private readonly localStorageService: LocalStorageService) {}

  public addToFavorites(id: number, event: MouseEvent): void {
    event.stopPropagation();

    if (this.favoritesArtworks.includes(id)) {
      this.favoritesArtworks = this.favoritesArtworks.filter((el) => el !== id);
      this.localStorageService.removeElementFromStorage(
        LocalStorage.FAVORITES,
        id
      );
      this.revomeFromFavoritesEvent.emit(id);
    } else {
      this.favoritesArtworks = [...this.favoritesArtworks, id];
      this.localStorageService.addElementToStorage<number>(
        LocalStorage.FAVORITES,
        id
      );
    }
  }
}

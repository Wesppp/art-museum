import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Artwork } from '@models/artwork.interface';
import { AddToFavoritesBtnComponent } from '@components/add-to-favorites-btn/add-to-favorites-btn.component';
import { CheckUndefinedValuePipe } from 'app/pipes/check-undefined-value.pipe';

@Component({
  selector: 'app-artwork-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddToFavoritesBtnComponent,
    CheckUndefinedValuePipe,
  ],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtworkCardComponent {
  @Input({ required: true }) public artwork!: Artwork;
  @Input() public isSmallCard: boolean = false;

  @Output() public revomeFromFavoritesEvent = new EventEmitter<number>();

  public revomeFromFavorites(id: number): void {
    this.revomeFromFavoritesEvent.emit(id);
  }
}

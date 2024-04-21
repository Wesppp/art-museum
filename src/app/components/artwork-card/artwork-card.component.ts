import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Artwork } from '@models/artwork.interface';
import { AddToFavoritesBtnComponent } from '@components/add-to-favorites-btn/add-to-favorites-btn.component';

@Component({
  selector: 'app-artwork-card',
  standalone: true,
  imports: [CommonModule, RouterLink, AddToFavoritesBtnComponent],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtworkCardComponent {
  @Input({ required: true }) public artwork!: Artwork;
}

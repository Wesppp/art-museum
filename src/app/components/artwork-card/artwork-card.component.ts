import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
    NgOptimizedImage,
  ],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtworkCardComponent {
  artwork = input.required<Artwork>();
  isSmallCard = input<boolean>(false);
}

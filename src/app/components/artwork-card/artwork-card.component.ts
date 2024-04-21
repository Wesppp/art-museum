import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Artwork } from '@models/artwork.interface';

@Component({
  selector: 'app-artwork-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtworkCardComponent {
  @Input({ required: true }) public artwork!: Artwork;
}
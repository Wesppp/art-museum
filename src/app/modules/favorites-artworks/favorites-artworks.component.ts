import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorites-artworks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-artworks.component.html',
  styleUrl: './favorites-artworks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesArtworksComponent {}

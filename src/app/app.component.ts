import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ArtworksService } from '@services/artworks.service';
import { Observable } from 'rxjs';
import { GetArtworksResponse } from '@models/get-artworks-response.interface';
import { CommonModule } from '@angular/common';
import { ArtworkCardComponent } from '@components/artwork-card/artwork-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    ArtworkCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'art-museum';
  public artworks$!: Observable<GetArtworksResponse>;

  constructor(private readonly artworksService: ArtworksService) {}

  ngOnInit(): void {
    this.artworks$ = this.artworksService.getArtworks();
  }
}

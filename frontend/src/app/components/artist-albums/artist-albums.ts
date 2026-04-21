import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ArtistService, Album } from '../../services/artist.service';

@Component({
  selector: 'app-artist-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist-albums.html',
  styleUrls: ['./artist-albums.css']
})
export class ArtistAlbumsComponent implements OnInit {
  albums: Album[] = [];
  isLoading = true;
  artistId = '';
  loadError = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly artistService: ArtistService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistId = id || '';

    if (id) {
      this.artistService.getArtistAlbums(id).subscribe({
        next: (data) => {
          this.albums = data;
          this.isLoading = false;
          this.loadError = '';
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.loadError = 'Não foi possível carregar a discografia deste artista.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.isLoading = false;
      this.loadError = 'Artista inválido.';
      this.cdr.detectChanges();
    }
  }
}

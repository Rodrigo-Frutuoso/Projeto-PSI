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

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[ArtistAlbums] O router carregou o ID:', id);

    if (id) {
      console.log('[ArtistAlbums] A iniciar o pedido HTTP para buscar os álbuns...');
      this.artistService.getArtistAlbums(id).subscribe({
        next: (data) => {
          this.albums = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('[ArtistAlbums] Erro a carregar álbuns', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      console.warn('[ArtistAlbums] Nenhum ID foi encontrado no URL.');
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}

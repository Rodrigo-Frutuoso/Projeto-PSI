import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { SearchStateService } from '../../services/search-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  username: string;
  artists: any[] = [];
  albums: any[] = [];
  isLoading = true;
  


  constructor(
    private readonly authService: AuthService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly searchStateService: SearchStateService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.username = this.authService.getCurrentUsername() || 'utilizador';
  }

  ngOnInit(): void {
    // A dashboard mostra sempre os recomendados por defeito.
    // A pesquisa é feita redirecionando para a página /search
    this.loadData('');
  }

  ngOnDestroy(): void {}

  async loadData(query: string = ''): Promise<void> {
    try {
      this.isLoading = true;
      this.cdr.detectChanges(); // Trigger loading state update
      
      // Carrega artistas e álbuns filtrados pela query
      const [artistsData, albumsData] = await Promise.all([
        firstValueFrom(this.artistService.searchArtists(query)),
        firstValueFrom(this.albumService.searchAlbums(query))
      ]);

      this.artists = artistsData.slice(0, 20);
      this.albums = albumsData.slice(0, 20);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Force angular to update the view
    }
  }

  getArtistAvatar(artist: any): string {
    if (artist.imageUrl) return artist.imageUrl;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=random&color=fff&size=128`;
  }
}

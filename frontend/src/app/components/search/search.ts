import { Component, ChangeDetectorRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArtistService, ArtistSummary } from '../../services/artist.service';
import { AlbumService, AlbumSummary } from '../../services/album.service';
import { SearchStateService } from '../../services/search-state.service';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

export type SearchType = 'artists' | 'albums';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  // Query state
  currentQuery = '';
  searchType: SearchType = 'artists';

  // Results
  artistResults: ArtistSummary[] = [];
  albumResults: AlbumSummary[] = [];

  // UI state
  isLoading = false;
  errorMessage = '';
  private sub?: Subscription;

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly searchStateService: SearchStateService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.pipe(
      debounceTime(250) // Reduce API calls while typing
    ).subscribe(params => {
      const q = params['q'] || '';
      const type: SearchType = params['type'] === 'albums' ? 'albums' : 'artists';
      this.currentQuery = q;
      this.searchType = type;
      
      // Sync the global navbar search type
      this.searchStateService.setSearchType(type);

      // Always perform search (empty query returns default list)
      this.performSearch(q, type);
    });
  }

  performSearch(query: string, type: SearchType): void {
    this.errorMessage = '';
    this.clearResults();
    this.isLoading = true;

    if (type === 'albums') {
      this.albumService.searchAlbums(query).pipe(
        catchError(() => of([]))
      ).subscribe({
        next: (albums) => {
          this.albumResults = albums ?? [];
          this.isLoading = false;
          if (this.albumResults.length === 0) {
            this.errorMessage = `Não foram encontrados álbuns para "${query}".`;
          }
          this.cdr.detectChanges();
        }
      });
    } else {
      this.artistService.searchArtists(query).pipe(
        catchError(() => of([]))
      ).subscribe({
        next: (artists) => {
          this.artistResults = artists ?? [];
          this.isLoading = false;
          if (this.artistResults.length === 0) {
            this.errorMessage = `Não foram encontrados artistas para "${query}".`;
          }
          this.cdr.detectChanges();
        }
      });
    }
  }

  openArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }

  get totalResults(): number {
    return this.searchType === 'albums' ? this.albumResults.length : this.artistResults.length;
  }

  get typeLabel(): string {
    return this.searchType === 'albums' ? 'álbum(ns)' : 'artista(s)';
  }

  private clearResults(): void {
    this.artistResults = [];
    this.albumResults = [];
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getArtistAvatar(artist: any): string {
    if (artist.imageUrl) return artist.imageUrl;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=random&color=fff&size=128`;
  }
}
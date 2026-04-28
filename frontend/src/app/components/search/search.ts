import { Component, ChangeDetectorRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArtistService, ArtistSummary } from '../../services/artist.service';
import { AlbumService, AlbumSummary } from '../../services/album.service';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  localQuery = '';

  // Results
  artistResults: ArtistSummary[] = [];
  albumResults: AlbumSummary[] = [];

  // UI state
  isLoading = false;
  errorMessage = '';
  isTypeDropdownOpen = false;
  private sub?: Subscription;

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      const q = params['q'] || '';
      const type: SearchType = params['type'] === 'albums' ? 'albums' : 'artists';
      this.currentQuery = q;
      this.localQuery = q;
      this.searchType = type;

      if (q.trim()) {
        this.performSearch(q, type);
      } else {
        this.clearResults();
        this.errorMessage = 'Nenhum termo de pesquisa introduzido.';
      }
    });
  }

  /** Called when the user submits the inline form on this page */
  onSearch(): void {
    const q = this.localQuery.trim();
    if (!q) return;
    this.router.navigate(['/search'], { queryParams: { q, type: this.searchType } });
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

  toggleTypeDropdown(): void {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  selectType(type: SearchType): void {
    this.searchType = type;
    this.isTypeDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Element;
    const clickedInsideTypeSelect = !!target.closest('.custom-type-select-container');

    if (!clickedInsideTypeSelect && this.isTypeDropdownOpen) {
      this.isTypeDropdownOpen = false;
    }
  }

  private clearResults(): void {
    this.artistResults = [];
    this.albumResults = [];
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
import { Component, ChangeDetectorRef, OnInit, NgZone, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { ArtistService, ArtistSummary } from './services/artist.service';
import { AlbumService, AlbumSummary } from './services/album.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('profileButton') profileButton?: ElementRef<HTMLButtonElement>;

  searchQuery = '';
  isDropdownOpen = false;
  isTypeDropdownOpen = false;
  navSearchType: 'artists' | 'albums' = 'artists';
  
  // Live Search variables
  private readonly searchSubject = new Subject<string>();
  private readonly albumSearchSubject = new Subject<string>();
  searchResults: ArtistSummary[] = [];
  albumSearchResults: AlbumSummary[] = [];
  isSearching = false;
  isSearchFocused = false;

  constructor(
    public authService: AuthService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  ngOnInit() {
    // Optionally close dropdown on navigation
    this.router.events.subscribe(() => {
      this.isDropdownOpen = false;
    });

    // Configure Live Search autocomplete — Artists
    this.searchSubject.pipe(
      debounceTime(150),
      switchMap(query => {
        const trimmedQuery = (query || '').trim();

        this.isSearching = true;
        return this.artistService.searchArtists(trimmedQuery).pipe(
          catchError(() => {
            return of([]); // Impede que o Subject morra por erro do servidor
          })
        );
      })
    ).subscribe({
      next: (results) => {
        this.zone.run(() => {
          this.searchResults = results;
          this.isSearching = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.zone.run(() => {
          this.searchResults = [];
          this.isSearching = false;
          this.cdr.detectChanges();
        });
      }
    });

    // Configure Live Search autocomplete — Albums
    this.albumSearchSubject.pipe(
      debounceTime(150),
      switchMap(query => {
        const trimmedQuery = (query || '').trim();

        this.isSearching = true;
        return this.albumService.searchAlbums(trimmedQuery).pipe(
          catchError(() => {
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (results) => {
        this.zone.run(() => {
          this.albumSearchResults = results;
          this.isSearching = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.zone.run(() => {
          this.albumSearchResults = [];
          this.isSearching = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get isAuthPage() {
    const currentPath = this.router.url.split('?')[0];
    return currentPath === '/login' || currentPath === '/register';
  }

  get showBrandTitle() {
    return this.isAuthPage;
  }

  get username() {
    return this.authService.getCurrentUsername();
  }

  get initial() {
    return this.username ? this.username.charAt(0).toUpperCase() : '?';
  }

  /** Returns the active results list for the current search type */
  get activeResults(): any[] {
    return this.navSearchType === 'albums' ? this.albumSearchResults : this.searchResults;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target;
    const clickedInsideSearch = target instanceof Element && !!target.closest('.nav-search-form');
    const clickedInsideProfile = target instanceof Element && !!target.closest('.profile-menu');
    const clickedInsideTypeSelect = target instanceof Element && !!target.closest('.custom-type-select-container');

    if (!clickedInsideTypeSelect && this.isTypeDropdownOpen) {
      this.isTypeDropdownOpen = false;
    }

    if (!clickedInsideSearch && this.isSearchFocused) {
      this.closeSearchImmediately();
    }

    if (!clickedInsideSearch && document.activeElement === this.searchInput?.nativeElement) {
      this.searchInput.nativeElement.blur();
    }

    if (!clickedInsideProfile && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }

    if (!clickedInsideProfile && document.activeElement === this.profileButton?.nativeElement) {
      this.profileButton.nativeElement.blur();
    }
  }

  logout() {
    this.authService.clearSession();
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }

  onSearchFocus() {
    this.isSearchFocused = true;

    if (!this.searchQuery.trim()) {
      this.clearAllResults();
      this.isSearching = true;
      this.emitSearch('');
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      const q = this.searchQuery;
      const type = this.navSearchType;
      this.searchQuery = ''; // Clear after navigating
      this.clearAllResults();
      this.isSearching = false;
      this.router.navigate(['/search'], { queryParams: { q, type } });
    }
  }

  onSearchChange(query: string) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      this.clearAllResults();
      this.isSearching = true;
      this.emitSearch('');
      return;
    }

    this.emitSearch(trimmedQuery);
  }

  onNavTypeChange(_type: 'artists' | 'albums') {
    // Clear live results when switching type, then re-trigger search
    this.clearAllResults();
    this.isSearching = true;
    this.emitSearch(this.searchQuery.trim());
  }

  toggleTypeDropdown() {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  selectType(type: 'artists' | 'albums') {
    this.navSearchType = type;
    this.isTypeDropdownOpen = false;
    this.onNavTypeChange(type);
  }

  closeSearch() {
    // Delay slightly so a click event on an item can trigger before DOM removal
    setTimeout(() => {
      this.closeSearchImmediately();
    }, 200);
  }

  /** Clear dropdown result when clicking an item */
  clearDropdown() {
    this.searchQuery = '';
    this.clearAllResults();
    this.isSearching = false;
  }

  private emitSearch(query: string) {
    if (this.navSearchType === 'albums') {
      this.albumSearchSubject.next(query);
    } else {
      this.searchSubject.next(query);
    }
  }

  private clearAllResults() {
    this.searchResults = [];
    this.albumSearchResults = [];
  }

  private closeSearchImmediately() {
    this.isSearchFocused = false;
    this.clearAllResults();
    this.isSearching = false;
  }
}

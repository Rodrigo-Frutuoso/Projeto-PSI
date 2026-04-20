import { Component, ChangeDetectorRef, OnInit, NgZone, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { ArtistService, ArtistSummary } from './services/artist.service';

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
  
  // Live Search variables
  private searchSubject = new Subject<string>();
  searchResults: ArtistSummary[] = [];
  isSearching = false;
  isSearchFocused = false;

  constructor(
    public authService: AuthService,
    private artistService: ArtistService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    // Optionally close dropdown on navigation
    this.router.events.subscribe(() => {
      this.isDropdownOpen = false;
    });

    // Configure Live Search autocomplete
    this.searchSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(query => {
        this.isSearching = true;
        return this.artistService.searchArtists(query || '').pipe(
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
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get username() {
    return this.authService.getCurrentUsername();
  }

  get initial() {
    return this.username ? this.username.charAt(0).toUpperCase() : '?';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target;
    const clickedInsideSearch = target instanceof Element && !!target.closest('.nav-search-form');
    const clickedInsideProfile = target instanceof Element && !!target.closest('.profile-menu');

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
    if (!this.searchQuery.trim() && this.searchResults.length === 0) {
      this.isSearching = true;
      this.searchSubject.next('');
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      const q = this.searchQuery;
      this.searchQuery = ''; // Clear after navigating
      this.searchResults = [];
      this.isSearching = false;
      this.router.navigate(['/search'], { queryParams: { q } });
    }
  }

  onSearchChange(query: string) {
    this.isSearching = true;
    this.searchSubject.next(query);
  }

  closeSearch() {
    // Delay slightly so a click event on an item can trigger before DOM removal
    setTimeout(() => {
      this.closeSearchImmediately();
    }, 200);
  }

  private closeSearchImmediately() {
    this.isSearchFocused = false;
    this.searchResults = [];
    this.isSearching = false;
  }
}

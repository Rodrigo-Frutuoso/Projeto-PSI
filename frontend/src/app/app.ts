import { Component, ChangeDetectorRef, OnInit, NgZone, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { SearchStateService } from './services/search-state.service';

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
  isSidebarExpanded = true;
  
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }


  constructor(
    public authService: AuthService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly searchStateService: SearchStateService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  ngOnInit() {
    // Optionally close dropdown on navigation and auto-switch search type
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false;
        
        // Auto-switch search type based on current page context
        if (event.urlAfterRedirects.startsWith('/album')) {
          this.searchStateService.setSearchType('albums');
        } else if (event.urlAfterRedirects.startsWith('/artist')) {
          this.searchStateService.setSearchType('artists');
        }
      }
    });

    // Keep the top search bar type synced with global state
    this.searchStateService.searchType$.subscribe(type => {
      if (this.navSearchType !== type) {
        this.navSearchType = type;
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



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target;
    const clickedInsideProfile = target instanceof Element && !!target.closest('.profile-menu');
    const clickedInsideTypeSelect = target instanceof Element && !!target.closest('.custom-type-select-container');

    if (!clickedInsideTypeSelect && this.isTypeDropdownOpen) {
      this.isTypeDropdownOpen = false;
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

  clearSearchState() {
    this.searchQuery = '';
    this.searchStateService.setSearchQuery('');
    this.cdr.detectChanges();
  }

  onSearch() {
    const q = this.searchQuery.trim();
    if (q) {
      const type = this.navSearchType;
      this.router.navigate(['/search'], { queryParams: { q, type } });
    } else {
      // If the user submits an empty search, return to dashboard
      this.searchQuery = '';
      this.searchStateService.setSearchQuery('');
      this.router.navigate(['/dashboard']);
    }
  }

  onSearchChange(query: string) {
    const trimmedQuery = query.trim();
    this.searchStateService.setSearchQuery(trimmedQuery);
    
    if (this.router.url.startsWith('/search')) {
      this.router.navigate(['/search'], { queryParams: { q: trimmedQuery, type: this.navSearchType }, replaceUrl: true });
    }
  }

  toggleTypeDropdown() {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  selectType(type: 'artists' | 'albums') {
    this.navSearchType = type;
    this.isTypeDropdownOpen = false;
    this.searchStateService.setSearchType(type);
    
    // Auto-update the search page if we are already on it
    if (this.router.url.startsWith('/search')) {
      const q = this.searchStateService.getCurrentQuery();
      this.router.navigate(['/search'], { queryParams: { q, type } });
    }
  }
}

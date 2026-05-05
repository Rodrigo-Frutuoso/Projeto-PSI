import { Component, ChangeDetectorRef, OnInit, NgZone, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { SearchStateService } from './services/search-state.service';
import { NotificationService } from './services/notification.service';

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
  showLogoutConfirmation = false;
  
  notifications: any[] = [];
  unreadCount = 0;
  isNotificationsOpen = false;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }


  constructor(
    public authService: AuthService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly searchStateService: SearchStateService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {}

  ngOnInit() {
    // Optionally close dropdown on navigation and auto-switch search type
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false;
        
        // Clear search if returning to dashboard
        if (event.urlAfterRedirects === '/dashboard' || event.urlAfterRedirects === '/') {
          this.clearSearchState();
        }

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

    if (this.isAuthenticated) {
      this.notificationService.getMyNotifications().subscribe();
      this.notificationService.notifications$.subscribe(nots => {
        this.notifications = nots;
        this.unreadCount = nots.filter((n: any) => !n.read).length;
        this.cdr.detectChanges();
      });
    }
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
    if (this.isDropdownOpen) {
      this.isNotificationsOpen = false;
    }
  }

  toggleNotifications() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isDropdownOpen = false;
    }
  }

  markNotificationAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notificationService.refreshNotifications();
    });
  }

  clearNotifications() {
    this.notificationService.clearAllNotifications().subscribe(() => {
      this.notificationService.refreshNotifications();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target;
    const clickedInsideProfile = target instanceof Element && !!target.closest('.profile-menu');
    const clickedInsideTypeSelect = target instanceof Element && !!target.closest('.custom-type-select-container');
    const clickedInsideNotifications = target instanceof Element && !!target.closest('.notifications-menu');

    if (!clickedInsideTypeSelect && this.isTypeDropdownOpen) {
      this.isTypeDropdownOpen = false;
    }

    if (!clickedInsideProfile && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }

    if (!clickedInsideNotifications && this.isNotificationsOpen) {
      this.isNotificationsOpen = false;
    }

    if (!clickedInsideProfile && document.activeElement === this.profileButton?.nativeElement) {
      this.profileButton.nativeElement.blur();
    }
  }

  logout() {
    this.showLogoutConfirmation = true;
  }

  confirmLogout() {
    this.authService.clearSession();
    this.isDropdownOpen = false;
    this.showLogoutConfirmation = false;
    this.router.navigate(['/login']);
  }

  cancelLogout() {
    this.showLogoutConfirmation = false;
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
    
    const isAlreadyOnSearch = this.router.url.startsWith('/search');

    if (trimmedQuery.length > 0) {
      // If we are typing something, go to search page (or update if already there)
      this.router.navigate(['/search'], { 
        queryParams: { q: trimmedQuery, type: this.navSearchType }, 
        replaceUrl: isAlreadyOnSearch 
      });
    } else if (isAlreadyOnSearch) {
      // If we are on search page and cleared the query, show all results (empty query)
      this.router.navigate(['/search'], { 
        queryParams: { q: '', type: this.navSearchType }, 
        replaceUrl: true 
      });
    }
  }

  toggleTypeDropdown() {
    this.isTypeDropdownOpen = !this.isTypeDropdownOpen;
  }

  selectType(type: 'artists' | 'albums') {
    this.navSearchType = type;
    this.isTypeDropdownOpen = false;
    this.searchStateService.setSearchType(type);
    
    // Auto-update the search page or navigate to it if there's a query
    const q = this.searchQuery.trim();
    if (q.length > 0) {
      this.router.navigate(['/search'], { 
        queryParams: { q, type }, 
        replaceUrl: this.router.url.startsWith('/search') 
      });
    } else if (this.router.url.startsWith('/search')) {
      // If on search page with no query, just update the type parameter
      this.router.navigate(['/search'], { queryParams: { q: '', type }, replaceUrl: true });
    }
  }
}

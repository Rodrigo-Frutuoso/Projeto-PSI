import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService, ArtistSummary, ArtistProfile } from '../../services/artist.service';
import { AuthService, UserProfile } from '../../services/auth.service';
import { Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './artist.html',
  styleUrl: './artist.css'
})
export class ArtistComponent implements OnInit, OnDestroy {
  artistProfile: ArtistProfile | null = null;
  get artist(): ArtistSummary | null {
    return this.artistProfile?.artist || null;
  }
  profile: UserProfile | null = null;
  isLoading = true;
  isSaving = false;
  loadError = '';
  showConfirmPopup = false;
  showAppToast = false;
  appToastMessage = '';
  appToastType: 'success' | 'error' = 'success';
  private pendingReplaceFavoriteId: string | null = null;
  private toastTimer?: ReturnType<typeof setTimeout>;
  private routeSub?: Subscription;
  private currentArtistId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly artistService: ArtistService,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // React to route param changes so /artist/:id -> /artist/:newId reloads profile.
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const artistId = params.get('id');

      if (!artistId) {
        this.currentArtistId = null;
        this.isLoading = false;
        this.loadError = 'Artista inválido.';
        return;
      }

      if (this.currentArtistId === artistId) {
        return;
      }

      this.currentArtistId = artistId;
      this.loadArtist(artistId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.clearToastTimer();
  }

  loadArtist(artistId: string): void {
    this.isLoading = true;
    this.loadError = '';
    this.showConfirmPopup = false;
    this.pendingReplaceFavoriteId = null;

    this.artistService.getArtistById(artistId).subscribe({
      next: (profile) => {
        this.artistProfile = profile;
        this.loadProfile();
      },
      error: () => {
        this.isLoading = false;
        this.loadError = 'Não foi possível carregar o artista.';
        this.cdr.detectChanges();
      }
    });
  }

  loadProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.profile = response.user;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.authService.clearSession();
          this.router.navigate(['/login']);
          return;
        }
        this.loadError = 'Não foi possível carregar o perfil do utilizador.';
        this.cdr.detectChanges();
      }
    });
  }

  get isFavorite(): boolean {
    return this.profile?.favoriteArtist?.id === this.artist?.id;
  }

  get hasDifferentFavorite(): boolean {
    return !!this.profile?.favoriteArtist?.id && !this.isFavorite;
  }

  toggleFavorite(): void {
    if (!this.artist) {
      return;
    }

    const wasFavorite = this.isFavorite;
    const currentFavoriteId = this.profile?.favoriteArtist?.id;

    if (wasFavorite) {
      this.saveFavorite(this.artistService.removeFavoriteArtist(this.artist.id), 'remove');
      return;
    }

    if (currentFavoriteId) {
      this.pendingReplaceFavoriteId = currentFavoriteId;
      this.showConfirmPopup = true;
      return;
    }

    this.saveFavorite(this.artistService.addFavoriteArtist(this.artist.id), 'add');
  }

  confirmReplaceFavorite(): void {
    if (!this.artist || !this.pendingReplaceFavoriteId) {
      this.showConfirmPopup = false;
      return;
    }

    const previousFavoriteId = this.pendingReplaceFavoriteId;
    this.showConfirmPopup = false;
    this.pendingReplaceFavoriteId = null;

    const request = this.artistService
      .removeFavoriteArtist(previousFavoriteId)
      .pipe(switchMap(() => this.artistService.addFavoriteArtist(this.artist!.id)));

    this.saveFavorite(request, 'replace');
  }

  cancelReplaceFavorite(): void {
    this.showConfirmPopup = false;
    this.pendingReplaceFavoriteId = null;
  }

  closeAppToast(): void {
    this.showAppToast = false;
    this.clearToastTimer();
  }

  private saveFavorite(request: Observable<unknown>, mode: 'add' | 'remove' | 'replace'): void {
    this.isSaving = true;

    request.subscribe({
      next: () => {
        this.isSaving = false;

        if (this.profile && this.artist) {
          this.profile = {
            ...this.profile,
            favoriteArtist: mode === 'remove'
              ? null
              : {
                id: this.artist.id,
                name: this.artist.name,
                isni: this.artist.isni
              }
          };
        }

        let message = 'Foi guardado como favorito na tua conta.';
        if (mode === 'remove') {
          message = 'Removido com sucesso!';
        } else if (mode === 'replace') {
          message = 'Removido com sucesso! Foi guardado como favorito na tua conta.';
        }

        this.openAppToast(message, 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isSaving = false;
        this.openAppToast(err.error?.message || 'Não foi possível atualizar o artista favorito.', 'error');
        this.cdr.detectChanges();
      }
    });
  }

  private openAppToast(message: string, type: 'success' | 'error'): void {
    this.clearToastTimer();
    this.appToastMessage = message;
    this.appToastType = type;
    this.showAppToast = true;
    this.toastTimer = setTimeout(() => {
      this.showAppToast = false;
      this.cdr.detectChanges();
    }, 3500);
  }

  private clearToastTimer(): void {
    if (!this.toastTimer) {
      return;
    }

    clearTimeout(this.toastTimer);
    this.toastTimer = undefined;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
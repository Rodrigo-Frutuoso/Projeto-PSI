import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService, ArtistSummary, ArtistProfile } from '../../services/artist.service';
import { AuthService, UserProfile } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
  actionMessage = '';
  actionError = '';
  successMessage = '';
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
  }

  loadArtist(artistId: string): void {
    this.isLoading = true;
    this.loadError = '';
    this.actionError = '';
    this.actionMessage = '';
    this.successMessage = '';

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

  toggleFavorite(): void {
    if (!this.artist) {
      return;
    }

    const wasFavorite = this.isFavorite;

    this.isSaving = true;
    this.actionError = '';
    this.actionMessage = '';
    this.successMessage = '';

    const request = wasFavorite
      ? this.artistService.removeFavoriteArtist(this.artist.id)
      : this.artistService.addFavoriteArtist(this.artist.id);

    request.subscribe({
      next: (response) => {
        this.isSaving = false;
        const message = wasFavorite
          ? 'Removido com sucesso!'
          : 'Foi guardado como favorito na tua conta.';
        this.successMessage = message;
        this.actionMessage = message;

        if (this.profile) {
          this.profile = {
            ...this.profile,
            favoriteArtist: wasFavorite ? null : {
              id: this.artist!.id,
              name: this.artist!.name,
              isni: this.artist!.isni
            }
          };
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isSaving = false;
        this.actionError = err.error?.message || 'Não foi possível atualizar o artista favorito.';
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
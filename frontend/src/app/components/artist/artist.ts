import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArtistService, ArtistSummary, ArtistProfile } from '../../services/artist.service';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './artist.html',
  styleUrl: './artist.css'
})
export class ArtistComponent implements OnInit {
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly artistService: ArtistService,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');

    if (!artistId) {
      this.isLoading = false;
      this.loadError = 'Artista inválido.';
      return;
    }

    this.loadArtist(artistId);
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
    return Boolean(this.profile?.favoriteArtist && this.artist && this.profile.favoriteArtist.id === this.artist.id);
  }

  toggleFavorite(): void {
    if (!this.artist) {
      return;
    }

    this.isSaving = true;
    this.actionError = '';
    this.actionMessage = '';
    this.successMessage = '';

    const request = this.isFavorite
      ? this.artistService.removeFavoriteArtist(this.artist.id)
      : this.artistService.addFavoriteArtist(this.artist.id);

    request.subscribe({
      next: (response) => {
        this.isSaving = false;
        this.successMessage = response.message;
        this.actionMessage = response.message;

        if (this.profile) {
          this.profile = {
            ...this.profile,
            favoriteArtist: this.isFavorite ? null : {
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
    this.location.back();
  }
}
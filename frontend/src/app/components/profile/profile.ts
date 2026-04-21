import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';

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
        } else {
          this.errorMessage = 'Não foi possível carregar o perfil. Tenta novamente.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  goBack(): void {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  username: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.username = this.authService.getCurrentUsername() || 'utilizador';
  }

  logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
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

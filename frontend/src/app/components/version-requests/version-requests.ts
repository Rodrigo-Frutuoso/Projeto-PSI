import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  VersionRequestItem,
  VersionRequestService,
  VersionRequestStatus
} from '../../services/version-request.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-version-requests',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './version-requests.html',
  styleUrl: './version-requests.css'
})
export class VersionRequestsComponent implements OnInit, OnDestroy {
  requests: VersionRequestItem[] = [];
  isLoading = true;
  errorMessage = '';
  selectedStatus: '' | VersionRequestStatus = '';
  private readonly destroy$ = new Subject<void>();

  readonly statuses: Array<{ value: '' | VersionRequestStatus; label: string }> = [
    { value: '', label: 'Todos os estados' },
    { value: 'em análise', label: 'Em análise' },
    { value: 'aceite', label: 'Aceite' },
    { value: 'recusado', label: 'Recusado' }
  ];

  isDropdownOpen = false;

  constructor(
    private readonly versionRequestService: VersionRequestService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRequests();

    this.notificationService.versionRequestsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadRequests();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectStatus(status: '' | VersionRequestStatus) {
    this.selectedStatus = status;
    this.isDropdownOpen = false;
    this.loadRequests();
  }

  getSelectedStatusLabel(): string {
    const s = this.statuses.find(x => x.value === this.selectedStatus);
    return s ? s.label : 'Todos os estados';
  }

  loadRequests(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.versionRequestService.getMyRequests(this.selectedStatus).subscribe({
      next: (requests) => {
        this.requests = requests;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        this.errorMessage = err.error?.message || 'Não foi possível carregar os pedidos.';
        this.cdr.detectChanges();
      }
    });
  }

  formatDate(dateRaw: string): string {
    return new Date(dateRaw).toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  statusClass(status: VersionRequestStatus): string {
    if (status === 'aceite') return 'status-aceite';
    if (status === 'recusado') return 'status-recusado';
    return 'status-analise';
  }
}

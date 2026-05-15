import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomListService, CustomListDetail } from '../../services/custom-list.service';

type SortField = 'title' | 'artistName' | 'releaseYear' | 'addedAt';

@Component({
  selector: 'app-custom-list-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-list-detail.html',
  styleUrl: './custom-list-detail.css'
})
export class CustomListDetailComponent implements OnInit, OnDestroy {
  list: CustomListDetail | null = null;
  isLoading = true;
  loadError = '';
  private routeSub?: Subscription;
  // Sort
  sortField: SortField = 'addedAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Toast / actions
  showActionToast = false;
  actionToastMessage = '';
  actionToastType: 'success' | 'error' = 'success';
  private actionToastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly customListService: CustomListService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        this.isLoading = false;
        this.loadError = 'Lista inválida.';
        this.cdr.detectChanges();
        return;
      }

      this.loadList(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  loadList(id: string): void {
    this.isLoading = true;
    this.loadError = '';

    this.customListService.getList(id).subscribe({
      next: (data) => {
        this.list = data;
        this.applySorting();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 401) {
          this.router.navigate(['/login']);
          return;
        }

        this.loadError = err.error?.message || 'Não foi possível carregar a lista.';
        this.cdr.detectChanges();
      }
    });
  }

  // ── Sorting ──
  sortBy(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    if (!this.list) return;

    const dir = this.sortDirection === 'asc' ? 1 : -1;

    this.list.albums.sort((a, b) => {
      let valA: any = a[this.sortField as keyof typeof a];
      let valB: any = b[this.sortField as keyof typeof b];

      valA ??= '';
      valB ??= '';

      if (this.sortField === 'addedAt') {
        return (new Date(valA).getTime() - new Date(valB).getTime()) * dir;
      }

      if (this.sortField === 'releaseYear') {
        return (Number(valA) - Number(valB)) * dir;
      }

      return String(valA).localeCompare(String(valB), 'pt') * dir;
    });
  }

  getSortIcon(field: SortField): string {
    if (this.sortField !== field) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // ── Remove album ──
  requestRemoveAlbum(albumId: string): void {
    if (!this.list) return;

    const ok = confirm('Remover este álbum desta lista?');
    if (!ok) return;

    this.customListService.removeAlbumFromList(this.list.id, albumId).subscribe({
      next: (res) => {
        if (!this.list) return;
        this.list.albums = this.list.albums.filter(a => a.albumId !== albumId);
        this.list.albumCount = this.list.albums.length;
        this.applySorting();
        this.showFeedbackToast(res.message || 'Álbum removido com sucesso.', 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.showFeedbackToast(err.error?.message || 'Erro ao remover o álbum.', 'error');
        this.cdr.detectChanges();
      }
    });
  }

  private showFeedbackToast(message: string, type: 'success' | 'error'): void {
    this.actionToastMessage = message;
    this.actionToastType = type;
    this.showActionToast = true;

    if (this.actionToastTimer) {
      clearTimeout(this.actionToastTimer);
    }

    this.actionToastTimer = setTimeout(() => {
      this.showActionToast = false;
      this.cdr.detectChanges();
    }, 3500);

    this.cdr.detectChanges();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/custom-lists']);
  }

  goToAlbum(albumId: string): void {
    this.router.navigate(['/album', albumId]);
  }
}
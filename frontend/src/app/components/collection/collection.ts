import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CollectionService, CollectionItem } from '../../services/collection.service';

type SortField = 'title' | 'releaseYear' | 'artistName' | 'ean13' | 'physicalSupport' | 'designation' | 'addedAt';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.css'
})
export class CollectionComponent implements OnInit, OnDestroy {
  collection: CollectionItem[] = [];
  isLoading = true;
  loadError = '';
  successMessage = '';
  showRemoveConfirmToast = false;
  pendingRemoveItem: CollectionItem | null = null;
  showActionToast = false;
  actionToastMessage = '';
  actionToastType: 'success' | 'error' = 'success';
  private actionToastTimer: ReturnType<typeof setTimeout> | null = null;
  sortField: SortField = 'addedAt';
  sortDirection: 'asc' | 'desc' = 'desc';
  isSortDropdownOpen = false;

  readonly sortOptions: Array<{ value: SortField; label: string }> = [
    { value: 'title', label: 'Título' },
    { value: 'releaseYear', label: 'Ano' },
    { value: 'artistName', label: 'Artista' },
    { value: 'ean13', label: 'EAN-13' },
    { value: 'physicalSupport', label: 'Suporte' },
    { value: 'addedAt', label: 'Data de Adição' }
  ];

  toggleSortDropdown() {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  selectSort(field: SortField) {
    this.sortBy(field);
    this.isSortDropdownOpen = false;
  }

  getSortLabel(): string {
    const opt = this.sortOptions.find(o => o.value === this.sortField);
    return opt ? opt.label : 'Ordenar por';
  }

  constructor(
    private readonly collectionService: CollectionService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  ngOnDestroy(): void {
    if (this.actionToastTimer) {
      clearTimeout(this.actionToastTimer);
    }
  }

  loadCollection(): void {
    this.isLoading = true;
    this.loadError = '';

    this.collectionService.getCollection().subscribe({
      next: (data) => {
        this.collection = data;
        this.applySorting();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.loadError = 'Não foi possível carregar a coleção.';
        }
        this.cdr.detectChanges();
      }
    });
  }

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
    const dir = this.sortDirection === 'asc' ? 1 : -1;

    this.collection.sort((a, b) => {
      let valA: any = a[this.sortField];
      let valB: any = b[this.sortField];

      // Tratar nulls
      valA ??= '';
      valB ??= '';

      // Datas
      if (this.sortField === 'addedAt') {
        return (new Date(valA).getTime() - new Date(valB).getTime()) * dir;
      }

      // Números
      if (this.sortField === 'releaseYear') {
        return (Number(valA) - Number(valB)) * dir;
      }

      // Strings
      return String(valA).localeCompare(String(valB), 'pt') * dir;
    });
  }

  getSortIcon(field: SortField): string {
    if (this.sortField !== field) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  requestRemoveItem(item: CollectionItem): void {
    this.pendingRemoveItem = item;
    this.showRemoveConfirmToast = true;
    this.cdr.detectChanges();
  }

  cancelRemove(): void {
    this.pendingRemoveItem = null;
    this.showRemoveConfirmToast = false;
    this.cdr.detectChanges();
  }

  confirmRemove(): void {
    if (!this.pendingRemoveItem) return;

    const item = this.pendingRemoveItem;
    this.pendingRemoveItem = null;
    this.showRemoveConfirmToast = false;
    this.successMessage = '';

    this.collectionService.removeFromCollection(item.id).subscribe({
      next: (response) => {
        this.collection = this.collection.filter(i => i.id !== item.id);
        this.showFeedbackToast(response.message || 'Item removido da coleção com sucesso.', 'success');
      },
      error: () => {
        this.showFeedbackToast('Erro ao remover o item da coleção.', 'error');
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

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToAlbum(albumId: string): void {
    // Navegar para a página do álbum (quando US9 estiver implementado)
    this.router.navigate(['/album', albumId]);
  }
}

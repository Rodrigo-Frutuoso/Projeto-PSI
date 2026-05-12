import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomListService, CustomList } from '../../services/custom-list.service';

type SortField = 'name' | 'albumCount' | 'updatedAt';

@Component({
  selector: 'app-custom-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './custom-lists.html',
  styleUrl: './custom-lists.css'
})
export class CustomListsComponent implements OnInit, OnDestroy {
  lists: CustomList[] = [];
  isLoading = true;
  loadError = '';

  // Create list form
  showCreateForm = false;
  newListName = '';
  createError = '';
  isCreating = false;

  // Toast
  showActionToast = false;
  actionToastMessage = '';
  actionToastType: 'success' | 'error' = 'success';
  private actionToastTimer: ReturnType<typeof setTimeout> | null = null;

  // Sort
  sortField: SortField = 'updatedAt';
  sortDirection: 'asc' | 'desc' = 'desc';
  isSortDropdownOpen = false;
  showDeleteConfirm = false;
  pendingDeleteList: CustomList | null = null;

  readonly sortOptions: Array<{ value: SortField; label: string }> = [
    { value: 'name', label: 'Nome' },
    { value: 'albumCount', label: 'Nº de Álbuns' },
    { value: 'updatedAt', label: 'Última Modificação' }
  ];

  constructor(
    private readonly customListService: CustomListService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLists();
  }

  ngOnDestroy(): void {
    if (this.actionToastTimer) {
      clearTimeout(this.actionToastTimer);
    }
  }

  loadLists(): void {
    this.isLoading = true;
    this.loadError = '';

    this.customListService.getLists().subscribe({
      next: (data) => {
        this.lists = data;
        this.applySorting();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.loadError = 'Não foi possível carregar as listas personalizadas.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  // ── Create List ──
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.newListName = '';
      this.createError = '';
    }
  }

  get nameCharCount(): number {
    return this.newListName.trim().length;
  }

  createList(): void {
    const name = this.newListName.trim();
    if (!name) {
      this.createError = 'O nome da lista é obrigatório.';
      return;
    }
    if (name.length > 100) {
      this.createError = 'O nome da lista não pode exceder 100 carateres.';
      return;
    }

    this.isCreating = true;
    this.createError = '';

    this.customListService.createList(name).subscribe({
      next: (response) => {
        this.isCreating = false;
        this.showCreateForm = false;
        this.newListName = '';
        this.showFeedbackToast(response.message || 'Lista criada com sucesso!', 'success');
        this.loadLists();
      },
      error: (err) => {
        this.isCreating = false;
        if (err.status === 409) {
          this.createError = 'Já existe uma lista com este nome.';
        } else if (err.status === 400) {
          this.createError = err.error?.message || 'Dados inválidos.';
        } else {
          this.createError = 'Erro ao criar a lista. Tenta novamente.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  cancelCreate(): void {
    this.showCreateForm = false;
    this.newListName = '';
    this.createError = '';
  }

  requestRemoveList(list: CustomList): void {
    this.pendingDeleteList = list;
    this.showDeleteConfirm = true;
    this.cdr.detectChanges();
  }

  cancelRemoveList(): void {
    this.pendingDeleteList = null;
    this.showDeleteConfirm = false;
    this.cdr.detectChanges();
  }

  confirmRemoveList(): void {
    if (!this.pendingDeleteList) {
      return;
    }

    const list = this.pendingDeleteList;
    this.pendingDeleteList = null;
    this.showDeleteConfirm = false;

    this.customListService.deleteList(list.id).subscribe({
      next: (response) => {
        this.lists = this.lists.filter(item => item.id !== list.id);
        this.applySorting();
        this.showFeedbackToast(response.message || 'Lista removida com sucesso!', 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.showFeedbackToast(err.error?.message || 'Erro ao remover a lista.', 'error');
        this.cdr.detectChanges();
      }
    });
  }

  // ── Sort ──
  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  selectSort(field: SortField): void {
    this.sortBy(field);
    this.isSortDropdownOpen = false;
  }

  getSortLabel(): string {
    const opt = this.sortOptions.find(o => o.value === this.sortField);
    return opt ? opt.label : 'Ordenar por';
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

    this.lists.sort((a, b) => {
      let valA: any = a[this.sortField];
      let valB: any = b[this.sortField];

      valA ??= '';
      valB ??= '';

      if (this.sortField === 'updatedAt') {
        return (new Date(valA).getTime() - new Date(valB).getTime()) * dir;
      }

      if (this.sortField === 'albumCount') {
        return (Number(valA) - Number(valB)) * dir;
      }

      return String(valA).localeCompare(String(valB), 'pt') * dir;
    });
  }

  getSortIcon(field: SortField): string {
    if (this.sortField !== field) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // ── Helpers ──
  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
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

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}

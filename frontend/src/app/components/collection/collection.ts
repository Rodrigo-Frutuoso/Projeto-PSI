import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class CollectionComponent implements OnInit {
  collection: CollectionItem[] = [];
  isLoading = true;
  loadError = '';
  successMessage = '';
  sortField: SortField = 'addedAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private readonly collectionService: CollectionService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCollection();
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
      if (valA == null) valA = '';
      if (valB == null) valB = '';

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

  removeItem(item: CollectionItem): void {
    if (!confirm(`Remover "${item.title}" (${item.ean13}) da coleção?`)) return;

    this.successMessage = '';

    this.collectionService.removeFromCollection(item.id).subscribe({
      next: (response) => {
        this.collection = this.collection.filter(i => i.id !== item.id);
        this.successMessage = response.message;
        this.cdr.detectChanges();

        // Limpar mensagem após 4s
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 4000);
      },
      error: () => {
        this.loadError = 'Erro ao remover o item da coleção.';
        this.cdr.detectChanges();
      }
    });
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

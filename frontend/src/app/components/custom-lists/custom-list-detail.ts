import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomListService, CustomListDetail } from '../../services/custom-list.service';

@Component({
  selector: 'app-custom-list-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './custom-list-detail.html',
  styleUrl: './custom-list-detail.css'
})
export class CustomListDetailComponent implements OnInit, OnDestroy {
  list: CustomListDetail | null = null;
  isLoading = true;
  loadError = '';
  private routeSub?: Subscription;

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
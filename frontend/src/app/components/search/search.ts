import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ArtistService, ArtistSummary } from '../../services/artist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  results: ArtistSummary[] = [];
  isLoading = false;
  errorMessage = '';
  currentQuery = '';
  private sub?: Subscription;

  constructor(
    private readonly artistService: ArtistService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      const q = params['q'] || '';
      this.currentQuery = q;
      if (q.trim()) {
        this.performSearch(q);
      } else {
        this.results = [];
        this.errorMessage = 'Nenhum termo de pesquisa introduzido.';
      }
    });
  }

  performSearch(query: string): void {
    this.errorMessage = '';
    this.results = [];
    this.isLoading = true;

    this.artistService.searchArtists(query).subscribe({
      next: (artists) => {
        this.results = artists || [];
        this.isLoading = false;
        if (this.results.length === 0) {
          this.errorMessage = 'Não foram encontrados artistas com esse nome.';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Erro ao comunicar com o servidor.';
        this.cdr.detectChanges();
      }
    });
  }

  openArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
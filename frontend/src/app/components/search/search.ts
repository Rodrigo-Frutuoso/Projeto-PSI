import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ArtistService, ArtistSummary } from '../../services/artist.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent {
  searchForm: FormGroup;
  results: ArtistSummary[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly artistService: ArtistService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSubmit(): void {
    const query = (this.searchForm.value.query || '').trim();
    this.errorMessage = '';
    this.results = [];

    if (!query) {
      this.errorMessage = 'Introduz um nome para pesquisar.';
      return;
    }

    this.isLoading = true;
    this.artistService.searchArtists(query).subscribe({
      next: (artists) => {
        this.results = artists;
        this.isLoading = false;
        if (artists.length === 0) {
          this.errorMessage = 'Não foram encontrados artistas com esse nome.';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Não foi possível pesquisar os artistas.';
        this.cdr.detectChanges();
      }
    });
  }

  openArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }
}
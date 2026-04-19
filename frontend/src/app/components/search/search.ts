import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArtistService, Artist } from '../../services/artist.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  searchQuery: string = '';
  artists: Artist[] = [];
  hasSearched: boolean = false;

  constructor(private artistService: ArtistService) {}

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.artists = [];
      this.hasSearched = false;
      return;
    }

    this.hasSearched = true;

    this.artistService.searchArtists(this.searchQuery).subscribe({
      next: (results) => {
        this.artists = results;
      },
      error: (err) => {
        console.error('Erro na pesquisa', err);
      }
    });
  }
}

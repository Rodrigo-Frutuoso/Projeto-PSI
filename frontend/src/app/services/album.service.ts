import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlbumSummary {
  _id: string;
  title: string;
  releaseYear: number;
  albumType?: string;
  mbid?: string;
  artista?: {
    _id: string;
    name: string;
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private readonly apiUrl = '/api/albums';
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
  }

  searchAlbums(search: string): Observable<AlbumSummary[]> {
    return this.http.get<AlbumSummary[]>(
      `${this.apiUrl}?search=${encodeURIComponent(search)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}

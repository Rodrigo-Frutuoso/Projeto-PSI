import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artist {
  _id: string;
  name: string;
  isni: string;
  startYear: number;
  artistType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = '/api/artists';

  constructor(private http: HttpClient) { }

  searchArtists(query: string): Observable<Artist[]> {
    const params = new HttpParams().set('search', query);
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Artist[]>(this.apiUrl, { params, headers });
  }
}

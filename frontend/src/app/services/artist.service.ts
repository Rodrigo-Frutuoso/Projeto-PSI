import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Album {
  _id?: string;
  mbid?: string;
  title: string;
  releaseYear: number;
  albumType?: string;
}

export interface ArtistSummary {
  id: string;
  name: string;
  isni: string;
  startYear: number;
  artistType?: 'solo' | 'group';
}

export interface ArtistProfile {
  artist: ArtistSummary;
  recentAlbums: Album[];
}

interface ArtistApiResponse {
  _id?: string;
  id?: string;
  name: string;
  isni: string;
  startYear: number;
  artistType?: 'solo' | 'group';
}

interface ArtistDetailsApiResponse {
  artist: ArtistApiResponse;
  recentAlbums?: Album[];
}

export interface FavoriteArtistResponse {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    dateOfBirth: string;
    favoriteArtist: {
      id: string;
      name: string;
      isni: string;
    } | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly apiUrl = '/api/artists';
  private readonly usersApiUrl = '/api/users';
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  searchArtists(search: string): Observable<ArtistSummary[]> {
    return this.http.get<ArtistApiResponse[]>(`${this.apiUrl}?search=${encodeURIComponent(search)}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((artists) => artists.map((artist) => ({
        id: artist.id || artist._id || '',
        name: artist.name,
        isni: artist.isni,
        startYear: artist.startYear,
        artistType: artist.artistType
      })))
    );
  }

  getArtistById(id: string): Observable<ArtistProfile> {
    return this.http.get<ArtistDetailsApiResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((response) => {
        const artistData = response.artist || response;
        return {
          artist: {
            id: artistData.id || artistData._id || id,
            name: artistData.name,
            isni: artistData.isni,
            startYear: artistData.startYear,
            artistType: artistData.artistType
          },
          recentAlbums: response.recentAlbums || []
        };
      })
    );
  }

  addFavoriteArtist(artistId: string): Observable<FavoriteArtistResponse> {
    return this.http.put<FavoriteArtistResponse>(`${this.usersApiUrl}/favorite-artist/${artistId}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  removeFavoriteArtist(artistId: string): Observable<FavoriteArtistResponse> {
    return this.http.delete<FavoriteArtistResponse>(`${this.usersApiUrl}/favorite-artist/${artistId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getArtistAlbums(id: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/${id}/albums`, {
      headers: this.getAuthHeaders()
    });
  }
}
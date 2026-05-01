import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlbumSummary {
  _id: string;
  title: string;
  releaseYear: number;
  albumType?: string;
  mbid?: string;
  coverImage?: string | null;
  artista?: {
    _id: string;
    name: string;
  } | null;
}

export interface AlbumTrack {
  _id?: string;
  trackNumber: number;
  song?: {
    _id?: string;
    isrc?: string | null;
    title: string;
    durationSeconds?: number;
    artists?: { _id: string; name: string }[];
  };
}

export interface AlbumVersion {
  _id?: string;
  ean13: string;
  physicalSupport: 'CD' | 'vinil' | 'cassete';
  designation?: string | null;
}

export interface AlbumDetail extends AlbumSummary {
  tracks?: AlbumTrack[];
  versions?: AlbumVersion[];
}

export interface VersionRequestPayload {
  versionEan13: string;
  physicalSupport: 'CD' | 'vinil' | 'cassete';
  designation?: string | null;
}

export interface VersionRequestResponse {
  message: string;
  request?: {
    id: string;
    albumId: string;
    albumTitle: string;
    versionEan13: string;
    physicalSupport: 'CD' | 'vinil' | 'cassete';
    designation: string | null;
    status: 'em análise' | 'aceite' | 'recusado';
    requestedAt: string;
  };
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

  getAlbum(id: string): Observable<AlbumDetail> {
    return this.http.get<AlbumDetail>(`${this.apiUrl}/${encodeURIComponent(id)}`, {
      headers: this.getAuthHeaders()
    });
  }

  submitVersionRequest(albumId: string, payload: VersionRequestPayload): Observable<VersionRequestResponse> {
    return this.http.post<VersionRequestResponse>(
      `${this.apiUrl}/${encodeURIComponent(albumId)}/version-requests`,
      payload,
      { headers: this.getAuthHeaders() }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CollectionItem {
  id: string;
  albumId: string;
  title: string;
  releaseYear: number;
  artistName: string;
  ean13: string;
  physicalSupport: string;
  designation: string | null;
  addedAt: string;
}

export interface AddToCollectionResponse {
  message: string;
  item?: {
    id: string;
    albumId: string;
    title: string;
    ean13: string;
    addedAt: string;
  };
}

export interface RemoveFromCollectionResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly apiUrl = '/api/collection';
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
  }

  getCollection(): Observable<CollectionItem[]> {
    return this.http.get<CollectionItem[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  addToCollection(albumId: string, versionEan13: string): Observable<AddToCollectionResponse> {
    return this.http.post<AddToCollectionResponse>(
      this.apiUrl,
      { albumId, versionEan13 },
      { headers: this.getAuthHeaders() }
    );
  }

  removeFromCollection(itemId: string): Observable<RemoveFromCollectionResponse> {
    return this.http.delete<RemoveFromCollectionResponse>(
      `${this.apiUrl}/${itemId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}

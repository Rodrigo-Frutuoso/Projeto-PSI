import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomList {
  id: string;
  name: string;
  albumCount: number;
  updatedAt: string;
}

export interface CustomListAlbum {
  albumId: string;
  title: string;
  artistName: string;
  releaseYear: number;
  addedAt: string;
}

export interface CustomListDetail extends CustomList {
  albums: CustomListAlbum[];
}

export interface CreateListResponse {
  message: string;
  list?: CustomList;
}

export interface DeleteListResponse {
  message: string;
}

export interface AddAlbumToListResponse {
  message: string;
}

export interface RemoveAlbumFromListResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomListService {
  private readonly apiUrl = '/api/custom-lists';
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
  }

  getLists(): Observable<CustomList[]> {
    return this.http.get<CustomList[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getList(id: string): Observable<CustomListDetail> {
    return this.http.get<CustomListDetail>(`${this.apiUrl}/${encodeURIComponent(id)}`, {
      headers: this.getAuthHeaders()
    });
  }

  createList(name: string): Observable<CreateListResponse> {
    return this.http.post<CreateListResponse>(
      this.apiUrl,
      { name },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteList(id: string): Observable<DeleteListResponse> {
    return this.http.delete<DeleteListResponse>(`${this.apiUrl}/${encodeURIComponent(id)}`, {
      headers: this.getAuthHeaders()
    });
  }

  addAlbumToList(listId: string, albumId: string): Observable<AddAlbumToListResponse> {
    return this.http.post<AddAlbumToListResponse>(
      `${this.apiUrl}/${encodeURIComponent(listId)}/albums`,
      { albumId },
      { headers: this.getAuthHeaders() }
    );
  }

  removeAlbumFromList(listId: string, albumId: string): Observable<RemoveAlbumFromListResponse> {
    return this.http.delete<RemoveAlbumFromListResponse>(
      `${this.apiUrl}/${encodeURIComponent(listId)}/albums/${encodeURIComponent(albumId)}`,
      { headers: this.getAuthHeaders() }
    );
  }
}


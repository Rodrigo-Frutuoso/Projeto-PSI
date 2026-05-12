import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomList {
  id: string;
  name: string;
  albumCount: number;
  updatedAt: string;
}

export interface CreateListResponse {
  message: string;
  list?: CustomList;
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

  createList(name: string): Observable<CreateListResponse> {
    return this.http.post<CreateListResponse>(
      this.apiUrl,
      { name },
      { headers: this.getAuthHeaders() }
    );
  }
}

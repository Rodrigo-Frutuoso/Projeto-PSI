import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export type VersionRequestStatus = 'em análise' | 'aceite' | 'recusado';

export interface VersionRequestItem {
  id: string;
  albumId: string | null;
  albumTitle: string;
  designation: string | null;
  requestedAt: string;
  status: VersionRequestStatus;
}

@Injectable({
  providedIn: 'root'
})
export class VersionRequestService {
  private readonly apiUrl = '/api/version-requests';
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
  }

  getMyRequests(status: '' | VersionRequestStatus = ''): Observable<VersionRequestItem[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return this.http.get<VersionRequestItem[]>(`${this.apiUrl}${query}`, {
      headers: this.getAuthHeaders()
    });
  }
}

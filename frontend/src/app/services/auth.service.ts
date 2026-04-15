import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    dateOfBirth: string;
  };
  errors?: string[];
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface FavoriteArtist {
  id: string;
  name: string;
  isni: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  dateOfBirth: string;
  favoriteArtist: FavoriteArtist | null;
}

export interface ProfileResponse {
  user: UserProfile;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
  newPassword?: string;
  dateOfBirth?: string;
  currentPassword: string;
}

export interface UpdateProfileResponse {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    dateOfBirth: string;
  };
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly usersApiUrl = '/api/users';
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  constructor(private readonly http: HttpClient) {}

  register(data: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  getProfile(): Observable<ProfileResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get<ProfileResponse>(`${this.usersApiUrl}/profile`, { headers });
  }

  updateProfile(data: UpdateProfileData): Observable<UpdateProfileResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.put<UpdateProfileResponse>(`${this.usersApiUrl}/profile`, data, { headers });
  }

  updateSessionUser(username: string, email: string): void {
    const userRaw = localStorage.getItem(this.userKey);
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        user.username = username;
        user.email = email;
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } catch { /* ignore */ }
    }
  }

  saveSession(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }

  getCurrentUsername(): string | null {
    const userRaw = localStorage.getItem(this.userKey);
    if (!userRaw) {
      return null;
    }

    try {
      const user = JSON.parse(userRaw) as { username?: string };
      return user.username ?? null;
    } catch {
      return null;
    }
  }
}

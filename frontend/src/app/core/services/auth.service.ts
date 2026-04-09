import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, ApiResponse, PublicProfile } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private currentUser = signal<User | null>(null);
  private token = signal<string | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');

  constructor(private http: HttpClient, private router: Router) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const token = localStorage.getItem('oj_token');
    const user = localStorage.getItem('oj_user');
    if (token && user) {
      this.token.set(token);
      this.currentUser.set(JSON.parse(user));
    }
  }

  getToken(): string | null {
    return this.token();
  }

  register(name: string, email: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.token.set(res.data.token);
          this.currentUser.set(res.data.user);
          localStorage.setItem('oj_token', res.data.token);
          localStorage.setItem('oj_user', JSON.stringify(res.data.user));
        }
      })
    );
  }

  sendMobileOtp(mobile: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/send-otp`, { mobile });
  }

  verifyMobileOtp(mobile: string, otp: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/verify-otp`, { mobile, otp }).pipe(
      tap((res) => {
        if (res.success && res.data) {
          this.token.set(res.data.token);
          this.currentUser.set(res.data.user);
          localStorage.setItem('oj_token', res.data.token);
          localStorage.setItem('oj_user', JSON.stringify(res.data.user));
        }
      })
    );
  }


  logout(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('oj_token');
    localStorage.removeItem('oj_user');
    this.router.navigate(['/login']);
  }

  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/me`);
  }

  getPublicProfile(userId: number): Observable<ApiResponse<PublicProfile>> {
    return this.http.get<ApiResponse<PublicProfile>>(`${this.apiUrl}/auth/profile/${userId}`);
  }

  updateProfile(data: { name?: string; bio?: string }): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/auth/me`, data);
  }

  getAllUsers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/auth/users`);
  }
}

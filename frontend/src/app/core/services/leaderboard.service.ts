import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, LeaderboardEntry, UserStats } from '../models';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  private readonly apiUrl = `${environment.apiUrl}/leaderboard`;

  constructor(private http: HttpClient) {}

  getLeaderboard(limit = 50): Observable<ApiResponse<LeaderboardEntry[]>> {
    return this.http.get<ApiResponse<LeaderboardEntry[]>>(`${this.apiUrl}?limit=${limit}`);
  }

  getUserStats(): Observable<ApiResponse<UserStats>> {
    return this.http.get<ApiResponse<UserStats>>(`${this.apiUrl}/stats`);
  }
}

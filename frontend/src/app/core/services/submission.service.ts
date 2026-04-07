import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Submission } from '../models';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private readonly apiUrl = `${environment.apiUrl}/submissions`;

  constructor(private http: HttpClient) {}

  submit(data: { problemId: number; code: string; language: string }): Observable<ApiResponse<Submission>> {
    return this.http.post<ApiResponse<Submission>>(`${this.apiUrl}/submit`, data);
  }

  run(data: { problemId: number; code: string; language: string }): Observable<ApiResponse<Submission>> {
    return this.http.post<ApiResponse<Submission>>(`${this.apiUrl}/run`, data);
  }

  getById(id: number): Observable<ApiResponse<Submission>> {
    return this.http.get<ApiResponse<Submission>>(`${this.apiUrl}/${id}`);
  }

  getByProblem(problemId: number): Observable<ApiResponse<Submission[]>> {
    return this.http.get<ApiResponse<Submission[]>>(`${this.apiUrl}/problem/${problemId}`);
  }

  getUserHistory(page = 1, limit = 20): Observable<ApiResponse<{ submissions: Submission[]; pagination: any }>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/history?page=${page}&limit=${limit}`);
  }

  getAll(page = 1, limit = 20): Observable<ApiResponse<{ submissions: Submission[]; pagination: any }>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/all?page=${page}&limit=${limit}`);
  }
}

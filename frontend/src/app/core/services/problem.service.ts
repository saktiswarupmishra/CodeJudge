import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Problem, ProblemListResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ProblemService {
  private readonly apiUrl = `${environment.apiUrl}/problems`;

  constructor(private http: HttpClient) {}

  getAll(filters?: { difficulty?: string; tag?: string; search?: string; page?: number; limit?: number }): Observable<ProblemListResponse> {
    let params = new HttpParams();
    if (filters?.difficulty) params = params.set('difficulty', filters.difficulty);
    if (filters?.tag) params = params.set('tag', filters.tag);
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.page) params = params.set('page', String(filters.page));
    if (filters?.limit) params = params.set('limit', String(filters.limit));
    return this.http.get<ProblemListResponse>(this.apiUrl, { params });
  }

  getById(id: number): Observable<ApiResponse<Problem>> {
    return this.http.get<ApiResponse<Problem>>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<ApiResponse<Problem>> {
    return this.http.post<ApiResponse<Problem>>(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<ApiResponse<Problem>> {
    return this.http.put<ApiResponse<Problem>>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  addTestCase(problemId: number, data: { input: string; output: string; isHidden: boolean }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/${problemId}/testcases`, data);
  }

  deleteTestCase(problemId: number, testCaseId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${problemId}/testcases/${testCaseId}`);
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProblemService } from '../../core/services/problem.service';
import { Problem } from '../../core/models';

@Component({
  selector: 'app-problem-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="problems-page">
      <div class="page-header">
        <div>
          <h1>Problems</h1>
          <p>Practice coding problems and sharpen your skills</p>
        </div>
      </div>

      <div class="filters">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search problems..." [(ngModel)]="searchQuery" (input)="onSearch()" />
        </div>
        <div class="difficulty-filters">
          <button class="filter-btn" [class.active]="!selectedDifficulty" (click)="filterByDifficulty('')">All</button>
          <button class="filter-btn easy" [class.active]="selectedDifficulty === 'EASY'" (click)="filterByDifficulty('EASY')">Easy</button>
          <button class="filter-btn medium" [class.active]="selectedDifficulty === 'MEDIUM'" (click)="filterByDifficulty('MEDIUM')">Medium</button>
          <button class="filter-btn hard" [class.active]="selectedDifficulty === 'HARD'" (click)="filterByDifficulty('HARD')">Hard</button>
        </div>
      </div>

      <div class="results-info" *ngIf="!loading()">
        <span>Showing {{ problems().length }} of {{ totalProblems() }} problems</span>
      </div>

      <div class="problems-table">
        <div class="table-header">
          <span class="col-id">#</span>
          <span class="col-title">Title</span>
          <span class="col-difficulty">Difficulty</span>
          <span class="col-tags">Tags</span>
        </div>
        @for (problem of problems(); track problem.id) {
          <a [routerLink]="['/problems', problem.id]" class="problem-row">
            <span class="col-id">{{ problem.id }}</span>
            <span class="col-title">{{ problem.title }}</span>
            <span class="col-difficulty">
              <span class="badge" [class]="problem.difficulty.toLowerCase()">{{ problem.difficulty }}</span>
            </span>
            <span class="col-tags">
              @for (tag of parseTags(problem.tags); track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </span>
          </a>
        }
        @if (problems().length === 0 && !loading()) {
          <div class="empty">No problems found.</div>
        }
        @if (loading()) {
          <div class="empty">Loading...</div>
        }
      </div>

      <!-- Pagination -->
      <div class="pagination" *ngIf="totalPages() > 1">
        <button class="page-btn" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">← Prev</button>
        @for (p of pageNumbers(); track p) {
          <button class="page-btn" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p }}</button>
        }
        <button class="page-btn" [disabled]="currentPage === totalPages()" (click)="goToPage(currentPage + 1)">Next →</button>
      </div>
    </div>
  `,
  styles: [`
    .problems-page { max-width: 1020px; margin: 0 auto; padding: 2rem; }

    .page-header { margin-bottom: 1.5rem; }
    .page-header h1 { color: var(--text-primary); font-size: 1.8rem; font-weight: 700; margin: 0 0 0.3rem; }
    .page-header p { color: var(--text-muted); margin: 0; font-size: 0.9rem; }

    .filters { display: flex; gap: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap; }

    .search-box {
      flex: 1; min-width: 200px;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.85rem;
      pointer-events: none;
    }

    .search-box input {
      width: 100%;
      padding: 0.65rem 1rem 0.65rem 2.5rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.9rem;
      outline: none;
      box-sizing: border-box;
      transition: border-color var(--transition-fast);
    }

    .search-box input:focus { border-color: var(--accent-primary); }
    .search-box input::placeholder { color: var(--text-dim); }

    .difficulty-filters { display: flex; gap: 0.35rem; }

    .filter-btn {
      padding: 0.5rem 0.9rem;
      border: 1px solid var(--border-default);
      background: var(--bg-surface);
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .filter-btn:hover { color: var(--text-primary); border-color: var(--border-strong); }
    .filter-btn.active { color: var(--text-primary); border-color: var(--accent-primary); background: rgba(99, 102, 241, 0.12); }
    .filter-btn.easy.active { border-color: var(--green); background: var(--green-bg); color: var(--green-light); }
    .filter-btn.medium.active { border-color: var(--yellow); background: var(--yellow-bg); color: var(--yellow-light); }
    .filter-btn.hard.active { border-color: var(--red); background: var(--red-bg); color: var(--red-light); }

    .results-info { color: var(--text-muted); font-size: 0.82rem; margin-bottom: 0.6rem; }

    .problems-table {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .table-header {
      display: grid;
      grid-template-columns: 55px 1fr 110px 220px;
      padding: 0.7rem 1.2rem;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
      border-bottom: 1px solid var(--border-subtle);
    }

    .problem-row {
      display: grid;
      grid-template-columns: 55px 1fr 110px 220px;
      padding: 0.85rem 1.2rem;
      color: var(--text-primary);
      text-decoration: none;
      border-bottom: 1px solid var(--border-subtle);
      transition: background var(--transition-fast);
      align-items: center;
    }

    .problem-row:last-child { border-bottom: none; }
    .problem-row:hover { background: var(--bg-surface-hover); }

    .col-id { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }
    .col-title { font-weight: 500; font-size: 0.9rem; }

    .badge {
      padding: 0.18rem 0.55rem;
      border-radius: 4px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .badge.easy { background: var(--green-bg); color: var(--green-light); }
    .badge.medium { background: var(--yellow-bg); color: var(--yellow-light); }
    .badge.hard { background: var(--red-bg); color: var(--red-light); }

    .tag {
      background: rgba(99, 102, 241, 0.1);
      color: #a5b4fc;
      padding: 0.12rem 0.45rem;
      border-radius: 3px;
      font-size: 0.72rem;
      margin-right: 0.25rem;
      font-weight: 500;
    }

    .empty { padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.9rem; }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
      margin-top: 1.2rem;
      flex-wrap: wrap;
    }

    .page-btn {
      padding: 0.4rem 0.8rem;
      border: 1px solid var(--border-default);
      background: var(--bg-surface);
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .page-btn:hover:not(:disabled) {
      background: rgba(99, 102, 241, 0.12);
      border-color: var(--accent-primary);
      color: var(--text-primary);
    }

    .page-btn.active {
      background: rgba(99, 102, 241, 0.2);
      border-color: var(--accent-primary);
      color: var(--text-primary);
      font-weight: 700;
    }

    .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  `]
})
export class ProblemListComponent implements OnInit {
  problems = signal<Problem[]>([]);
  loading = signal(true);
  totalProblems = signal(0);
  totalPages = signal(0);
  searchQuery = '';
  selectedDifficulty = '';
  currentPage = 1;
  pageSize = 20;

  constructor(private problemService: ProblemService) {}

  ngOnInit() { this.loadProblems(); }

  loadProblems() {
    this.loading.set(true);
    this.problemService.getAll({
      difficulty: this.selectedDifficulty || undefined,
      search: this.searchQuery || undefined,
      page: this.currentPage,
      limit: this.pageSize,
    }).subscribe({
      next: (res) => {
        this.problems.set(res.data?.problems || []);
        this.totalProblems.set(res.data?.pagination?.total || 0);
        this.totalPages.set(res.data?.pagination?.totalPages || 0);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  filterByDifficulty(d: string) {
    this.selectedDifficulty = d;
    this.currentPage = 1;
    this.loadProblems();
  }

  onSearch() {
    this.currentPage = 1;
    this.loadProblems();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage = page;
    this.loadProblems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  pageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, current - 2);
      let end = Math.min(total - 1, current + 2);
      if (current <= 3) end = 5;
      if (current >= total - 2) start = total - 4;
      for (let i = start; i <= end; i++) pages.push(i);
      pages.push(total);
    }
    return pages;
  }

  parseTags(tags: any): string[] {
    if (Array.isArray(tags)) return tags;
    try { return JSON.parse(tags); } catch { return []; }
  }
}

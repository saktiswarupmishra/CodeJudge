import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProblemService } from '../../core/services/problem.service';
import { AuthService } from '../../core/services/auth.service';
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
        <div class="header-stats">
          <div class="stat-pill"><span class="stat-num">{{ totalProblems() }}</span> Total</div>
          <div class="stat-pill easy-pill"><span class="stat-num">{{ easyCount() }}</span> Easy</div>
          <div class="stat-pill medium-pill"><span class="stat-num">{{ mediumCount() }}</span> Medium</div>
          <div class="stat-pill hard-pill"><span class="stat-num">{{ hardCount() }}</span> Hard</div>
        </div>
      </div>

      <div class="filters">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search problems..." [(ngModel)]="searchQuery" (input)="onSearch()" />
        </div>
        <div class="filter-group">
          <div class="difficulty-filters">
            <button class="filter-btn" [class.active]="!selectedDifficulty" (click)="filterByDifficulty('')">All</button>
            <button class="filter-btn easy" [class.active]="selectedDifficulty === 'EASY'" (click)="filterByDifficulty('EASY')">Easy</button>
            <button class="filter-btn medium" [class.active]="selectedDifficulty === 'MEDIUM'" (click)="filterByDifficulty('MEDIUM')">Medium</button>
            <button class="filter-btn hard" [class.active]="selectedDifficulty === 'HARD'" (click)="filterByDifficulty('HARD')">Hard</button>
          </div>
          @if (auth.isLoggedIn()) {
            <div class="status-filters">
              <button class="filter-btn" [class.active]="selectedStatus === 'all'" (click)="filterByStatus('all')">All</button>
              <button class="filter-btn solved-btn" [class.active]="selectedStatus === 'solved'" (click)="filterByStatus('solved')">✅ Solved</button>
              <button class="filter-btn attempted-btn" [class.active]="selectedStatus === 'attempted'" (click)="filterByStatus('attempted')">🔶 Attempted</button>
              <button class="filter-btn todo-btn" [class.active]="selectedStatus === 'todo'" (click)="filterByStatus('todo')">⬜ Todo</button>
            </div>
          }
        </div>
      </div>

      <!-- Tag Filters -->
      <div class="tag-filters" *ngIf="allTags().length > 0">
        <button class="tag-chip" [class.active]="!selectedTag" (click)="filterByTag('')">All Tags</button>
        @for (tag of visibleTags(); track tag) {
          <button class="tag-chip" [class.active]="selectedTag === tag" (click)="filterByTag(tag)">{{ tag }}</button>
        }
        @if (allTags().length > 12) {
          <button class="tag-chip toggle-btn" (click)="showAllTags = !showAllTags">
            {{ showAllTags ? '← Less' : (allTags().length - 12) + ' more →' }}
          </button>
        }
      </div>

      <div class="results-bar" *ngIf="!loading()">
        <span class="results-text">Showing {{ problems().length }} of {{ totalProblems() }} problems</span>
        <div class="sort-controls">
          <select [(ngModel)]="sortField" (change)="onSortChange()" class="sort-select">
            <option value="id">Sort by #</option>
            <option value="title">Sort by Title</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="acceptanceRate">Sort by Acceptance</option>
          </select>
          <button class="sort-order-btn" (click)="toggleSortOrder()" [title]="sortOrder === 'asc' ? 'Ascending' : 'Descending'">
            {{ sortOrder === 'asc' ? '↑' : '↓' }}
          </button>
        </div>
      </div>

      <div class="problems-table">
        <div class="table-header">
          <span class="col-status">Status</span>
          <span class="col-id">#</span>
          <span class="col-title">Title</span>
          <span class="col-acceptance">Acceptance</span>
          <span class="col-difficulty">Difficulty</span>
          <span class="col-tags">Tags</span>
        </div>
        @if (loading()) {
          @for (i of [1,2,3,4,5,6,7,8]; track i) {
            <div class="skeleton-row">
              <span class="col-status"><div class="skeleton-circle"></div></span>
              <span class="col-id"><div class="skeleton-text short"></div></span>
              <span class="col-title"><div class="skeleton-text long"></div></span>
              <span class="col-acceptance"><div class="skeleton-text medium"></div></span>
              <span class="col-difficulty"><div class="skeleton-text medium"></div></span>
              <span class="col-tags"><div class="skeleton-text long"></div></span>
            </div>
          }
        }
        @for (problem of problems(); track problem.id; let i = $index) {
          <a [routerLink]="['/problems', problem.id]" class="problem-row" [class.even]="i % 2 === 0">
            <span class="col-status">
              @if (problem.userStatus === 'solved') {
                <span class="status-icon solved" title="Solved">✅</span>
              } @else if (problem.userStatus === 'attempted') {
                <span class="status-icon attempted" title="Attempted">🔶</span>
              } @else {
                <span class="status-icon todo" title="Not attempted">⬜</span>
              }
            </span>
            <span class="col-id">{{ problem.id }}</span>
            <span class="col-title">{{ problem.title }}</span>
            <span class="col-acceptance">
              <div class="acceptance-bar">
                <div class="acceptance-fill" [style.width.%]="problem.acceptanceRate || 0"></div>
              </div>
              <span class="acceptance-text">{{ problem.acceptanceRate || 0 }}%</span>
            </span>
            <span class="col-difficulty">
              <span class="badge" [class]="problem.difficulty.toLowerCase()">{{ problem.difficulty }}</span>
            </span>
            <span class="col-tags">
              @for (tag of parseTags(problem.tags).slice(0, 3); track tag) {
                <span class="tag">{{ tag }}</span>
              }
              @if (parseTags(problem.tags).length > 3) {
                <span class="tag more-tag">+{{ parseTags(problem.tags).length - 3 }}</span>
              }
            </span>
          </a>
        }
        @if (problems().length === 0 && !loading()) {
          <div class="empty">
            <div class="empty-icon">🔍</div>
            <p>No problems found matching your criteria.</p>
            <button class="btn-reset" (click)="resetFilters()">Reset Filters</button>
          </div>
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
    .problems-page { max-width: 1100px; margin: 0 auto; padding: 2rem; }

    .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; }
    .page-header h1 { color: var(--text-primary); font-size: 1.8rem; font-weight: 700; margin: 0 0 0.3rem; }
    .page-header p { color: var(--text-muted); margin: 0; font-size: 0.9rem; }

    .header-stats { display: flex; gap: 0.5rem; }
    .stat-pill {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 0.35rem 0.7rem;
      border-radius: 20px;
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    .stat-num { font-weight: 700; color: var(--text-primary); margin-right: 0.25rem; }
    .easy-pill .stat-num { color: var(--green-light); }
    .medium-pill .stat-num { color: var(--yellow-light); }
    .hard-pill .stat-num { color: var(--red-light); }

    .filters { display: flex; gap: 0.8rem; margin-bottom: 0.8rem; flex-wrap: wrap; }
    .filter-group { display: flex; gap: 0.5rem; flex-wrap: wrap; }

    .search-box { flex: 1; min-width: 200px; position: relative; }
    .search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); font-size: 0.85rem; pointer-events: none; }
    .search-box input {
      width: 100%; padding: 0.65rem 1rem 0.65rem 2.5rem;
      background: var(--bg-surface); border: 1px solid var(--border-default);
      border-radius: var(--radius-md); color: var(--text-primary);
      font-size: 0.9rem; outline: none; box-sizing: border-box;
      transition: border-color var(--transition-fast);
    }
    .search-box input:focus { border-color: var(--accent-primary); }
    .search-box input::placeholder { color: var(--text-dim); }

    .difficulty-filters, .status-filters { display: flex; gap: 0.35rem; }

    .filter-btn {
      padding: 0.5rem 0.9rem; border: 1px solid var(--border-default);
      background: var(--bg-surface); color: var(--text-muted);
      border-radius: var(--radius-sm); cursor: pointer;
      font-size: 0.82rem; font-weight: 500;
      transition: all var(--transition-fast);
    }
    .filter-btn:hover { color: var(--text-primary); border-color: var(--border-strong); }
    .filter-btn.active { color: var(--text-primary); border-color: var(--accent-primary); background: rgba(99, 102, 241, 0.12); }
    .filter-btn.easy.active { border-color: var(--green); background: var(--green-bg); color: var(--green-light); }
    .filter-btn.medium.active { border-color: var(--yellow); background: var(--yellow-bg); color: var(--yellow-light); }
    .filter-btn.hard.active { border-color: var(--red); background: var(--red-bg); color: var(--red-light); }
    .filter-btn.solved-btn.active { background: var(--green-bg); border-color: var(--green); color: var(--green-light); }
    .filter-btn.attempted-btn.active { background: var(--yellow-bg); border-color: var(--yellow); color: var(--yellow-light); }
    .filter-btn.todo-btn.active { background: rgba(148, 163, 184, 0.12); border-color: rgba(148, 163, 184, 0.4); color: #94a3b8; }

    .tag-filters { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.8rem; }
    .tag-chip {
      padding: 0.25rem 0.6rem; border-radius: 14px;
      background: var(--bg-surface); border: 1px solid var(--border-subtle);
      color: var(--text-muted); cursor: pointer;
      font-size: 0.72rem; font-weight: 500;
      transition: all var(--transition-fast);
    }
    .tag-chip:hover { border-color: var(--border-strong); color: var(--text-primary); }
    .tag-chip.active { background: rgba(99, 102, 241, 0.15); border-color: var(--accent-primary); color: #a5b4fc; }
    .tag-chip.toggle-btn { background: transparent; border-style: dashed; color: var(--accent-secondary); }

    .results-bar {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 0.6rem;
    }
    .results-text { color: var(--text-muted); font-size: 0.82rem; }
    .sort-controls { display: flex; gap: 0.3rem; align-items: center; }
    .sort-select {
      background: var(--bg-surface); border: 1px solid var(--border-default);
      color: var(--text-primary); padding: 0.35rem 0.6rem;
      border-radius: var(--radius-sm); font-size: 0.78rem; cursor: pointer;
    }
    .sort-select option { background: var(--bg-secondary); }
    .sort-order-btn {
      width: 28px; height: 28px;
      background: var(--bg-surface); border: 1px solid var(--border-default);
      color: var(--text-primary); border-radius: var(--radius-sm);
      cursor: pointer; font-size: 0.85rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      transition: all var(--transition-fast);
    }
    .sort-order-btn:hover { background: var(--bg-surface-hover); }

    .problems-table {
      background: var(--bg-surface); border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg); overflow: hidden;
    }

    .table-header {
      display: grid;
      grid-template-columns: 50px 50px 1fr 120px 100px 200px;
      padding: 0.7rem 1.2rem; color: var(--text-muted);
      font-size: 0.72rem; text-transform: uppercase;
      letter-spacing: 0.8px; font-weight: 600;
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(255,255,255,0.02);
    }

    .problem-row {
      display: grid;
      grid-template-columns: 50px 50px 1fr 120px 100px 200px;
      padding: 0.78rem 1.2rem; color: var(--text-primary);
      text-decoration: none;
      border-bottom: 1px solid var(--border-subtle);
      transition: background var(--transition-fast);
      align-items: center;
    }
    .problem-row.even { background: rgba(255,255,255,0.015); }
    .problem-row:last-child { border-bottom: none; }
    .problem-row:hover { background: rgba(99, 102, 241, 0.06); }

    .skeleton-row {
      display: grid;
      grid-template-columns: 50px 50px 1fr 120px 100px 200px;
      padding: 0.85rem 1.2rem;
      border-bottom: 1px solid var(--border-subtle);
      align-items: center;
    }

    .skeleton-circle { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,255,255,0.06); animation: shimmer 1.5s infinite; }
    .skeleton-text { height: 14px; border-radius: 4px; background: rgba(255,255,255,0.06); animation: shimmer 1.5s infinite; }
    .skeleton-text.short { width: 30px; }
    .skeleton-text.medium { width: 60px; }
    .skeleton-text.long { width: 120px; }

    @keyframes shimmer {
      0% { opacity: 0.4; }
      50% { opacity: 0.8; }
      100% { opacity: 0.4; }
    }

    .status-icon { font-size: 0.85rem; }
    .col-id { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }
    .col-title { font-weight: 500; font-size: 0.9rem; }

    .acceptance-bar {
      width: 60px; height: 4px; background: rgba(255,255,255,0.06);
      border-radius: 2px; overflow: hidden; margin-bottom: 2px;
    }
    .acceptance-fill { height: 100%; background: var(--accent-primary); border-radius: 2px; transition: width 0.3s ease; }
    .acceptance-text { font-size: 0.75rem; color: var(--text-muted); }

    .badge {
      padding: 0.18rem 0.55rem; border-radius: 4px;
      font-size: 0.72rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.3px;
    }
    .badge.easy { background: var(--green-bg); color: var(--green-light); }
    .badge.medium { background: var(--yellow-bg); color: var(--yellow-light); }
    .badge.hard { background: var(--red-bg); color: var(--red-light); }

    .tag {
      background: rgba(99, 102, 241, 0.1); color: #a5b4fc;
      padding: 0.12rem 0.45rem; border-radius: 3px;
      font-size: 0.72rem; margin-right: 0.25rem; font-weight: 500;
    }
    .more-tag { background: rgba(255,255,255,0.05); color: var(--text-dim); }

    .empty { padding: 3rem; text-align: center; }
    .empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .empty p { color: var(--text-muted); font-size: 0.9rem; }
    .btn-reset {
      margin-top: 0.8rem; padding: 0.5rem 1.2rem;
      background: var(--accent-gradient); color: #fff;
      border: none; border-radius: var(--radius-md);
      cursor: pointer; font-weight: 600; font-size: 0.85rem;
    }

    .pagination {
      display: flex; justify-content: center; align-items: center;
      gap: 0.3rem; margin-top: 1.2rem; flex-wrap: wrap;
    }
    .page-btn {
      padding: 0.4rem 0.8rem; border: 1px solid var(--border-default);
      background: var(--bg-surface); color: var(--text-secondary);
      border-radius: var(--radius-sm); cursor: pointer;
      font-size: 0.82rem; font-weight: 500;
      transition: all var(--transition-fast);
    }
    .page-btn:hover:not(:disabled) { background: rgba(99, 102, 241, 0.12); border-color: var(--accent-primary); color: var(--text-primary); }
    .page-btn.active { background: rgba(99, 102, 241, 0.2); border-color: var(--accent-primary); color: var(--text-primary); font-weight: 700; }
    .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
      .header-stats { flex-wrap: wrap; }
      .table-header, .problem-row, .skeleton-row {
        grid-template-columns: 30px 35px 1fr 80px;
      }
      .col-tags, .col-acceptance { display: none; }
      .col-status { display: block; }
    }
  `]
})
export class ProblemListComponent implements OnInit {
  problems = signal<Problem[]>([]);
  loading = signal(true);
  totalProblems = signal(0);
  totalPages = signal(0);
  allTags = signal<string[]>([]);
  searchQuery = '';
  selectedDifficulty = '';
  selectedStatus = 'all';
  selectedTag = '';
  sortField = 'id';
  sortOrder = 'asc';
  currentPage = 1;
  pageSize = 20;
  showAllTags = false;

  easyCount = signal(0);
  mediumCount = signal(0);
  hardCount = signal(0);

  constructor(
    private problemService: ProblemService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadProblems();
    this.loadTags();
  }

  loadTags() {
    this.problemService.getAllTags().subscribe({
      next: (res) => { if (res.success) this.allTags.set(res.data || []); },
    });
  }

  visibleTags(): string[] {
    return this.showAllTags ? this.allTags() : this.allTags().slice(0, 12);
  }

  loadProblems() {
    this.loading.set(true);
    this.problemService.getAll({
      difficulty: this.selectedDifficulty || undefined,
      search: this.searchQuery || undefined,
      tag: this.selectedTag || undefined,
      page: this.currentPage,
      limit: this.pageSize,
      sort: this.sortField,
      order: this.sortOrder,
      status: this.selectedStatus !== 'all' ? this.selectedStatus : undefined,
    }).subscribe({
      next: (res) => {
        const probs = res.data?.problems || [];
        this.problems.set(probs);
        this.totalProblems.set(res.data?.pagination?.total || 0);
        this.totalPages.set(res.data?.pagination?.totalPages || 0);
        // Count difficulties
        this.easyCount.set(probs.filter(p => p.difficulty === 'EASY').length);
        this.mediumCount.set(probs.filter(p => p.difficulty === 'MEDIUM').length);
        this.hardCount.set(probs.filter(p => p.difficulty === 'HARD').length);
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

  filterByStatus(s: string) {
    this.selectedStatus = s;
    this.currentPage = 1;
    this.loadProblems();
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;
    this.currentPage = 1;
    this.loadProblems();
  }

  onSearch() {
    this.currentPage = 1;
    this.loadProblems();
  }

  onSortChange() {
    this.currentPage = 1;
    this.loadProblems();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadProblems();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedDifficulty = '';
    this.selectedStatus = 'all';
    this.selectedTag = '';
    this.sortField = 'id';
    this.sortOrder = 'asc';
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

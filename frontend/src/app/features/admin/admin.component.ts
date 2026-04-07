import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ProblemService } from '../../core/services/problem.service';
import { SubmissionService } from '../../core/services/submission.service';
import { Problem, Submission } from '../../core/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>🛠️ Admin Dashboard</h1>

      <div class="tab-bar">
        <button [class.active]="activeTab === 'problems'" (click)="activeTab = 'problems'">Problems</button>
        <button [class.active]="activeTab === 'users'" (click)="activeTab = 'users'; loadUsers()">Users</button>
        <button [class.active]="activeTab === 'submissions'" (click)="activeTab = 'submissions'; loadSubmissions()">Submissions</button>
        <button [class.active]="activeTab === 'create'" (click)="activeTab = 'create'">+ New Problem</button>
      </div>

      <!-- Problems Tab -->
      @if (activeTab === 'problems') {
        <div class="section">
          @for (p of problems(); track p.id) {
            <div class="item-row">
              <span class="item-id">#{{ p.id }}</span>
              <span class="item-title">{{ p.title }}</span>
              <span class="badge" [class]="p.difficulty.toLowerCase()">{{ p.difficulty }}</span>
              <button class="btn-sm danger" (click)="deleteProblem(p.id)">Delete</button>
            </div>
          }
        </div>
      }

      <!-- Users Tab -->
      @if (activeTab === 'users') {
        <div class="section">
          @for (u of users(); track u.id) {
            <div class="item-row">
              <span class="item-id">#{{ u.id }}</span>
              <span class="item-title">{{ u.name }}</span>
              <span class="item-meta">{{ u.email }}</span>
              <span class="badge" [class]="u.role.toLowerCase()">{{ u.role }}</span>
            </div>
          }
        </div>
      }

      <!-- Submissions Tab -->
      @if (activeTab === 'submissions') {
        <div class="section">
          @for (s of allSubmissions(); track s.id) {
            <div class="item-row">
              <span class="item-id">#{{ s.id }}</span>
              <span class="item-title">{{ s.user?.name }} → {{ s.problem?.title }}</span>
              <span class="item-meta">{{ s.language }}</span>
              <span class="sub-result" [class]="s.result.toLowerCase().replace('_','-')">{{ s.result }}</span>
            </div>
          }
        </div>
      }

      <!-- Create Problem Tab -->
      @if (activeTab === 'create') {
        <div class="create-form">
          <div class="form-group">
            <label>Title</label>
            <input [(ngModel)]="newProblem.title" placeholder="Problem title" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newProblem.description" rows="6" placeholder="Problem description (markdown)"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Difficulty</label>
              <select [(ngModel)]="newProblem.difficulty">
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div class="form-group">
              <label>Tags (comma-separated)</label>
              <input [(ngModel)]="newProblem.tagsStr" placeholder="Array, Hash Table" />
            </div>
          </div>
          <div class="form-group">
            <label>Constraints</label>
            <textarea [(ngModel)]="newProblem.constraints" rows="3" placeholder="Constraints"></textarea>
          </div>
          <h3>Test Cases</h3>
          @for (tc of newProblem.testCases; track $index) {
            <div class="tc-form">
              <div class="form-row">
                <div class="form-group"><label>Input</label><textarea [(ngModel)]="tc.input" rows="2"></textarea></div>
                <div class="form-group"><label>Expected Output</label><textarea [(ngModel)]="tc.output" rows="2"></textarea></div>
              </div>
              <label class="checkbox"><input type="checkbox" [(ngModel)]="tc.isHidden" /> Hidden test case</label>
            </div>
          }
          <button class="btn-sm" (click)="addTestCase()">+ Add Test Case</button>
          @if (createError()) { <div class="error-msg">{{ createError() }}</div> }
          @if (createSuccess()) { <div class="success-msg">{{ createSuccess() }}</div> }
          <button class="btn-primary" (click)="createProblem()">Create Problem</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-page { max-width: 1020px; margin: 0 auto; padding: 2rem; }

    h1 { color: var(--text-primary); margin-bottom: 1.2rem; font-size: 1.8rem; font-weight: 700; }

    .tab-bar { display: flex; gap: 0.35rem; margin-bottom: 1.2rem; flex-wrap: wrap; }

    .tab-bar button {
      padding: 0.45rem 0.9rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .tab-bar button:hover { color: var(--text-primary); border-color: var(--border-strong); }
    .tab-bar button.active { background: rgba(99, 102, 241, 0.12); border-color: var(--accent-primary); color: var(--text-primary); }

    .item-row {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.7rem 0.9rem;
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      margin-bottom: 0.35rem;
      border: 1px solid var(--border-subtle);
    }

    .item-id { color: var(--text-muted); font-size: 0.82rem; min-width: 36px; font-weight: 500; }
    .item-title { flex: 1; color: var(--text-primary); font-size: 0.88rem; }
    .item-meta { color: var(--text-muted); font-size: 0.82rem; }

    .badge { padding: 0.15rem 0.45rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }
    .badge.easy { background: var(--green-bg); color: var(--green-light); }
    .badge.medium { background: var(--yellow-bg); color: var(--yellow-light); }
    .badge.hard { background: var(--red-bg); color: var(--red-light); }
    .badge.admin { background: var(--red-bg); color: var(--red-light); }
    .badge.user { background: var(--blue-bg); color: var(--blue-light); }

    .sub-result { font-size: 0.78rem; font-weight: 600; }
    .sub-result.accepted { color: var(--green-light); }
    .sub-result.wrong-answer { color: var(--red-light); }
    .sub-result.time-limit-exceeded { color: var(--yellow-light); }
    .sub-result.runtime-error { color: #fb923c; }
    .sub-result.pending { color: #94a3b8; }

    .btn-sm {
      padding: 0.3rem 0.65rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      color: var(--text-primary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.78rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .btn-sm.danger { border-color: rgba(239, 68, 68, 0.25); color: var(--red-light); }
    .btn-sm.danger:hover { background: var(--red-bg); }

    .create-form {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.3rem;
    }

    .form-group { margin-bottom: 0.8rem; }

    .form-group label {
      display: block;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
      font-size: 0.82rem;
      font-weight: 500;
    }

    .form-group input, .form-group textarea, .form-group select {
      width: 100%;
      padding: 0.55rem 0.7rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-size: 0.88rem;
      outline: none;
      box-sizing: border-box;
      font-family: inherit;
      transition: border-color var(--transition-fast);
    }

    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
      border-color: var(--accent-primary);
    }

    .form-group select option { background: var(--bg-secondary); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }

    .tc-form {
      background: rgba(0, 0, 0, 0.15);
      padding: 0.8rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.6rem;
      border: 1px solid var(--border-subtle);
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-muted);
      font-size: 0.82rem;
      cursor: pointer;
      margin-top: 0.4rem;
    }

    h3 { color: var(--text-secondary); margin: 0.8rem 0 0.6rem; font-size: 0.88rem; font-weight: 600; }

    .btn-primary {
      width: 100%;
      padding: 0.7rem;
      background: var(--accent-gradient);
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.8rem;
      transition: transform var(--transition-fast), box-shadow var(--transition-base);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
    }

    .error-msg {
      background: var(--red-bg);
      color: #fca5a5;
      padding: 0.5rem 0.7rem;
      border-radius: var(--radius-sm);
      margin-top: 0.5rem;
      font-size: 0.82rem;
    }

    .success-msg {
      background: var(--green-bg);
      color: #86efac;
      padding: 0.5rem 0.7rem;
      border-radius: var(--radius-sm);
      margin-top: 0.5rem;
      font-size: 0.82rem;
    }
  `]
})
export class AdminComponent implements OnInit {
  activeTab = 'problems';
  problems = signal<Problem[]>([]);
  users = signal<any[]>([]);
  allSubmissions = signal<Submission[]>([]);
  createError = signal('');
  createSuccess = signal('');

  newProblem = {
    title: '',
    description: '',
    difficulty: 'EASY' as const,
    tagsStr: '',
    constraints: '',
    testCases: [{ input: '', output: '', isHidden: false }],
  };

  constructor(
    private problemService: ProblemService,
    private authService: AuthService,
    private submissionService: SubmissionService
  ) {}

  ngOnInit() { this.loadProblems(); }

  loadProblems() {
    this.problemService.getAll({ limit: 100 }).subscribe({
      next: (res) => this.problems.set(res.data?.problems || []),
    });
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res) => this.users.set(res.data || []),
    });
  }

  loadSubmissions() {
    this.submissionService.getAll(1, 50).subscribe({
      next: (res) => this.allSubmissions.set(res.data?.submissions || []),
    });
  }

  deleteProblem(id: number) {
    if (confirm('Delete this problem?')) {
      this.problemService.delete(id).subscribe({
        next: () => this.loadProblems(),
      });
    }
  }

  addTestCase() {
    this.newProblem.testCases.push({ input: '', output: '', isHidden: false });
  }

  createProblem() {
    this.createError.set('');
    this.createSuccess.set('');
    const tags = this.newProblem.tagsStr.split(',').map((t) => t.trim()).filter((t) => t);
    this.problemService.create({
      title: this.newProblem.title,
      description: this.newProblem.description,
      difficulty: this.newProblem.difficulty,
      tags,
      constraints: this.newProblem.constraints,
      testCases: this.newProblem.testCases,
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.createSuccess.set('Problem created successfully!');
          this.newProblem = { title: '', description: '', difficulty: 'EASY', tagsStr: '', constraints: '', testCases: [{ input: '', output: '', isHidden: false }] };
          this.loadProblems();
        } else {
          this.createError.set(res.error || 'Failed to create');
        }
      },
      error: (err) => this.createError.set(err.error?.error || 'Failed to create'),
    });
  }
}

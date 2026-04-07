import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { SubmissionService } from '../../core/services/submission.service';
import { UserStats, Submission } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="dash-header">
        <h1>👋 Welcome, {{ userName() }}</h1>
        <p>Track your progress and keep coding!</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card purple">
          <div class="stat-value">{{ stats()?.problemsSolved || 0 }}</div>
          <div class="stat-label">Problems Solved</div>
        </div>
        <div class="stat-card green">
          <div class="stat-value">{{ stats()?.acceptedSubmissions || 0 }}</div>
          <div class="stat-label">Accepted</div>
        </div>
        <div class="stat-card blue">
          <div class="stat-value">{{ stats()?.totalSubmissions || 0 }}</div>
          <div class="stat-label">Total Submissions</div>
        </div>
        <div class="stat-card orange">
          <div class="stat-value">{{ stats()?.accuracy || 0 }}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
      </div>

      <div class="panels">
        <div class="panel">
          <h3>📊 Difficulty Breakdown</h3>
          <div class="difficulty-bars">
            <div class="diff-row">
              <span class="diff-label easy">Easy</span>
              <div class="diff-bar"><div class="diff-fill easy" [style.width.%]="easyPct()"></div></div>
              <span class="diff-count">{{ stats()?.difficultyBreakdown?.EASY || 0 }}</span>
            </div>
            <div class="diff-row">
              <span class="diff-label medium">Medium</span>
              <div class="diff-bar"><div class="diff-fill medium" [style.width.%]="mediumPct()"></div></div>
              <span class="diff-count">{{ stats()?.difficultyBreakdown?.MEDIUM || 0 }}</span>
            </div>
            <div class="diff-row">
              <span class="diff-label hard">Hard</span>
              <div class="diff-bar"><div class="diff-fill hard" [style.width.%]="hardPct()"></div></div>
              <span class="diff-count">{{ stats()?.difficultyBreakdown?.HARD || 0 }}</span>
            </div>
          </div>
        </div>

        <div class="panel">
          <h3>📋 Recent Submissions</h3>
          @for (sub of recentSubs(); track sub.id) {
            <div class="sub-item">
              <a [routerLink]="['/problems', sub.problemId]" class="sub-problem">{{ sub.problem?.title || 'Problem #' + sub.problemId }}</a>
              <span class="sub-result" [class]="sub.result.toLowerCase().replace('_','-')">{{ formatResult(sub.result) }}</span>
            </div>
          }
          @if (recentSubs().length === 0) {
            <p class="empty">No submissions yet. <a routerLink="/problems">Start practicing!</a></p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1020px; margin: 0 auto; padding: 2rem; }

    .dash-header h1 { color: var(--text-primary); margin: 0 0 0.3rem; font-size: 1.8rem; font-weight: 700; }
    .dash-header p { color: var(--text-muted); margin: 0 0 1.5rem; font-size: 0.9rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }

    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.3rem;
      text-align: center;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
    }

    .stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-card); }
    .stat-card.purple { border-left: 3px solid var(--accent-primary); }
    .stat-card.green { border-left: 3px solid var(--green); }
    .stat-card.blue { border-left: 3px solid var(--blue); }
    .stat-card.orange { border-left: 3px solid var(--yellow); }

    .stat-value { font-size: 2rem; font-weight: 800; color: var(--text-primary); }
    .stat-label { color: var(--text-muted); font-size: 0.82rem; margin-top: 0.2rem; font-weight: 500; }

    .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }

    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.3rem;
    }

    .panel h3 { color: var(--text-secondary); margin: 0 0 1rem; font-size: 0.92rem; font-weight: 600; }

    .diff-row { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.7rem; }
    .diff-label { width: 56px; font-size: 0.78rem; font-weight: 700; }
    .diff-label.easy { color: var(--green-light); }
    .diff-label.medium { color: var(--yellow-light); }
    .diff-label.hard { color: var(--red-light); }

    .diff-bar { flex: 1; height: 7px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden; }
    .diff-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
    .diff-fill.easy { background: linear-gradient(90deg, #22c55e, #4ade80); }
    .diff-fill.medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .diff-fill.hard { background: linear-gradient(90deg, #ef4444, #f87171); }
    .diff-count { color: var(--text-muted); font-size: 0.82rem; width: 28px; text-align: right; font-weight: 500; }

    .sub-item { display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 0; border-bottom: 1px solid var(--border-subtle); }
    .sub-item:last-child { border-bottom: none; }

    .sub-problem { color: #a5b4fc; text-decoration: none; font-size: 0.88rem; font-weight: 500; transition: color var(--transition-fast); }
    .sub-problem:hover { color: #c7d2fe; }
    .sub-result { font-size: 0.78rem; font-weight: 600; }
    .sub-result.accepted { color: var(--green-light); }
    .sub-result.wrong-answer { color: var(--red-light); }
    .sub-result.time-limit-exceeded { color: var(--yellow-light); }
    .sub-result.runtime-error { color: #fb923c; }
    .sub-result.pending { color: #94a3b8; }
    .empty { color: var(--text-dim); font-size: 0.82rem; }
    .empty a { color: var(--accent-secondary); }

    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .panels { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName = signal('');
  stats = signal<UserStats | null>(null);
  recentSubs = signal<Submission[]>([]);

  constructor(
    private auth: AuthService,
    private leaderboardService: LeaderboardService,
    private submissionService: SubmissionService
  ) {}

  ngOnInit() {
    this.userName.set(this.auth.user()?.name || 'User');
    this.leaderboardService.getUserStats().subscribe({
      next: (res) => { if (res.success) this.stats.set(res.data!); },
    });
    this.submissionService.getUserHistory(1, 10).subscribe({
      next: (res) => { if (res.success) this.recentSubs.set(res.data?.submissions || []); },
    });
  }

  easyPct() { const s = this.stats(); return s ? Math.min((s.difficultyBreakdown.EASY / Math.max(s.problemsSolved, 1)) * 100, 100) : 0; }
  mediumPct() { const s = this.stats(); return s ? Math.min((s.difficultyBreakdown.MEDIUM / Math.max(s.problemsSolved, 1)) * 100, 100) : 0; }
  hardPct() { const s = this.stats(); return s ? Math.min((s.difficultyBreakdown.HARD / Math.max(s.problemsSolved, 1)) * 100, 100) : 0; }

  formatResult(r: string) {
    const m: Record<string, string> = { ACCEPTED: '✅', WRONG_ANSWER: '❌', TIME_LIMIT_EXCEEDED: '⏰', RUNTIME_ERROR: '💥', PENDING: '⏳' };
    return m[r] || r;
  }
}

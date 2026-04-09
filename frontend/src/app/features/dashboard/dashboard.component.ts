import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { AuthService } from '../../core/services/auth.service';
import { ProblemService } from '../../core/services/problem.service';
import { SubmissionService } from '../../core/services/submission.service';
import { UserStats, User, Problem, Submission } from '../../core/models';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <div class="header">
        <h1>Welcome back, <span class="accent">{{ user?.name }}</span>! 👋</h1>
        <p>Keep up the great work. Here's your coding progress.</p>
      </div>

      <!-- Quick Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon bg-indigo">📝</div>
          <div class="stat-info">
            <span class="stat-label">Total Submissions</span>
            <span class="stat-val">{{ stats?.totalSubmissions || 0 }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-green">✅</div>
          <div class="stat-info">
            <span class="stat-label">Problems Solved</span>
            <span class="stat-val">{{ stats?.problemsSolved || 0 }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-amber">🎯</div>
          <div class="stat-info">
            <span class="stat-label">Accuracy</span>
            <span class="stat-val">{{ stats?.accuracy || 0 }}%</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-rose">🔥</div>
          <div class="stat-info">
            <span class="stat-label">30-Day Activity</span>
            <span class="stat-val">{{ stats?.recentSubmissions || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="charts-row">
        <!-- Difficulty Chart -->
        <div class="dashboard-card chart-container">
          <h2>Difficulty Breakdown</h2>
          <canvas id="difficultyChart"></canvas>
          <div class="difficulty-totals">
            <div class="diff-chip easy"><span class="lbl">Easy</span> <span class="val">{{ stats?.difficultyBreakdown?.EASY || 0 }}</span></div>
            <div class="diff-chip medium"><span class="lbl">Med</span> <span class="val">{{ stats?.difficultyBreakdown?.MEDIUM || 0 }}</span></div>
            <div class="diff-chip hard"><span class="lbl">Hard</span> <span class="val">{{ stats?.difficultyBreakdown?.HARD || 0 }}</span></div>
          </div>
        </div>

        <!-- Language Details && Bookmarks -->
        <div class="dashboard-card">
          <h2>Your Bookmarks</h2>
          <div class="bookmarks-list">
            @if(bookmarks.length > 0) {
              @for(b of bookmarks.slice(0,5); track b.id) {
                <a [routerLink]="['/problems', b.id]" class="bookmark-item">
                  <span class="b-id">#{{b.id}}</span>
                  <span class="b-title">{{b.title}}</span>
                  <span class="badge" [class]="b.difficulty.toLowerCase()">{{b.difficulty}}</span>
                </a>
              }
              @if(bookmarks.length > 5) {
                <div class="view-more">And {{bookmarks.length - 5}} more...</div>
              }
            } @else {
              <div class="empty-state">
                <span class="icon">⭐</span>
                <p>No bookmarked problems</p>
                <a routerLink="/problems" class="btn-sm">Browse Problems</a>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Recent Submissions Table -->
      <div class="dashboard-card margin-top">
        <div class="card-header">
          <h2>Recent Submissions</h2>
          <button class="btn-outline" routerLink="/problems">Practice More</button>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Problem</th>
                <th>Language</th>
                <th>Result</th>
                <th>Time (ms)</th>
              </tr>
            </thead>
            <tbody>
              @for(sub of recentSubs; track sub.id) {
                <tr>
                  <td>{{ formatDate(sub.createdAt) }}</td>
                  <td>
                    @if(sub.problem) {
                      <a [routerLink]="['/problems', sub.problem.id]" class="problem-link">
                        {{ sub.problem.title }}
                      </a>
                    } @else {
                      <span>Unknown Problem</span>
                    }
                  </td>
                  <td>{{ sub.language }}</td>
                  <td>
                    <span class="result-badge" [class]="sub.result.toLowerCase().replace('_', '-')">
                      {{ formatResult(sub.result) }}
                    </span>
                  </td>
                  <td>{{ sub.executionTime || '-' }}</td>
                </tr>
              }
            </tbody>
          </table>
          @if(recentSubs.length === 0) {
            <div class="empty-state p-4">
              <span class="icon">💻</span>
              <p>You haven't submitted any code yet.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { max-width: 1100px; margin: 0 auto; padding: 2rem; }
    
    .header { margin-bottom: 2rem; }
    .header h1 { font-size: 2rem; color: var(--text-primary); margin: 0 0 0.5rem; }
    .header p { color: var(--text-muted); font-size: 1rem; margin: 0; }
    .accent { 
      background: var(--accent-gradient); 
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent; 
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.2rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s;
    }
    .stat-card:hover { transform: translateY(-3px); border-color: var(--border-default); }

    .stat-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem;
    }
    .bg-indigo { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
    .bg-green { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
    .bg-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .bg-rose { background: rgba(244, 63, 94, 0.15); color: #fb7185; }

    .stat-info { display: flex; flex-direction: column; }
    .stat-label { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }
    .stat-val { color: var(--text-primary); font-size: 1.5rem; font-weight: 700; }

    .charts-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .dashboard-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
    }
    .dashboard-card h2 { font-size: 1.1rem; color: var(--text-primary); margin: 0 0 1.2rem; font-weight: 600; }
    
    .margin-top { margin-top: 1.5rem; }

    .chart-container { display: flex; flex-direction: column; align-items: center; }
    canvas { max-width: 250px; max-height: 250px; }
    
    .difficulty-totals {
      display: flex; gap: 1rem; margin-top: 1.5rem; width: 100%; justify-content: center;
    }
    .diff-chip {
      padding: 0.4rem 0.8rem; border-radius: var(--radius-md); background: rgba(0,0,0,0.2);
      border: 1px solid var(--border-subtle); display: flex; flex-direction: column; align-items: center;
      min-width: 60px;
    }
    .diff-chip .lbl { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .diff-chip .val { font-size: 1.1rem; font-weight: 700; }
    .diff-chip.easy { border-color: rgba(34, 197, 94, 0.3); } .diff-chip.easy .lbl { color: var(--green-light); }
    .diff-chip.medium { border-color: rgba(245, 158, 11, 0.3); } .diff-chip.medium .lbl { color: var(--yellow-light); }
    .diff-chip.hard { border-color: rgba(239, 68, 68, 0.3); } .diff-chip.hard .lbl { color: var(--red-light); }

    .bookmarks-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .bookmark-item {
      display: flex; align-items: center; padding: 0.8rem 1rem;
      background: rgba(0,0,0,0.15); border-radius: var(--radius-sm);
      text-decoration: none; border: 1px solid transparent;
      transition: background 0.2s, border 0.2s;
    }
    .bookmark-item:hover { background: rgba(99,102,241,0.08); border-color: var(--border-default); }
    .b-id { color: var(--text-muted); margin-right: 0.8rem; font-family: monospace; }
    .b-title { color: var(--text-primary); font-weight: 500; flex: 1; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; margin-right: 1rem; }
    .view-more { text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem; }
    
    .badge { padding: 0.18rem 0.55rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
    .badge.easy { background: var(--green-bg); color: var(--green-light); }
    .badge.medium { background: var(--yellow-bg); color: var(--yellow-light); }
    .badge.hard { background: var(--red-bg); color: var(--red-light); }

    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
    .card-header h2 { margin: 0; }
    .btn-outline {
      background: transparent; border: 1px solid var(--accent-primary);
      color: var(--accent-primary); padding: 0.4rem 1rem;
      border-radius: var(--radius-md); font-size: 0.85rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .btn-outline:hover { background: rgba(99, 102, 241, 0.1); }

    .table-container { overflow-x: auto; }
    .data-table {
      width: 100%; border-collapse: collapse; text-align: left;
    }
    .data-table th {
      padding: 0.8rem 1rem; border-bottom: 1px solid var(--border-subtle);
      color: var(--text-muted); font-size: 0.85rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .data-table td {
      padding: 0.9rem 1rem; border-bottom: 1px solid var(--border-subtle);
      color: var(--text-secondary); font-size: 0.9rem;
    }
    .data-table tr:hover td { background: rgba(255,255,255,0.02); }
    
    .problem-link { color: var(--accent-secondary); text-decoration: none; font-weight: 500; }
    .problem-link:hover { text-decoration: underline; }

    .result-badge {
      display: inline-block; padding: 0.2rem 0.5rem;
      border-radius: 4px; font-size: 0.75rem; font-weight: 600;
    }
    .result-badge.accepted { background: var(--green-bg); color: var(--green-light); }
    .result-badge.wrong-answer { background: var(--red-bg); color: var(--red-light); }
    .result-badge.time-limit-exceeded { background: var(--yellow-bg); color: var(--yellow-light); }
    .result-badge.runtime-error { background: rgba(249, 115, 22, 0.15); color: #fb923c; }
    .result-badge.pending { background: rgba(148, 163, 184, 0.15); color: #94a3b8; }

    .empty-state { text-align: center; color: var(--text-muted); }
    .empty-state .icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
    .btn-sm { display: inline-block; padding: 0.4rem 1rem; background: var(--accent-gradient); color: #fff; text-decoration: none; border-radius: var(--radius-sm); font-size: 0.8rem; margin-top: 0.5rem; }
    .p-4 { padding: 2rem; }

    @media (max-width: 768px) {
      .charts-row { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  stats: UserStats | null = null;
  recentSubs: Submission[] = [];
  bookmarks: Problem[] = [];
  chartInstance: Chart | null = null;

  constructor(
    private auth: AuthService,
    private lbService: LeaderboardService,
    private problemService: ProblemService,
    private subService: SubmissionService
  ) {}

  ngOnInit() {
    this.user = this.auth.user();
    this.loadStats();
    this.loadSubmissions();
    this.loadBookmarks();
  }

  loadStats() {
    this.lbService.getUserStats().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.stats = res.data;
          this.renderChart();
        }
      }
    });
  }

  loadBookmarks() {
    this.problemService.getBookmarks().subscribe({
      next: (res) => { if(res.success) this.bookmarks = res.data || []; }
    });
  }

  loadSubmissions() {
    this.subService.getUserHistory(1, 10).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.recentSubs = res.data.submissions;
        }
      }
    });
  }

  renderChart() {
    if (!this.stats) return;
    
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const { EASY, MEDIUM, HARD } = this.stats.difficultyBreakdown;
    
    // Only render chart if there is data
    if (EASY === 0 && MEDIUM === 0 && HARD === 0) return;

    const ctx = document.getElementById('difficultyChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{
          data: [EASY, MEDIUM, HARD],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',  // Green
            'rgba(245, 158, 11, 0.8)', // Yellow
            'rgba(239, 68, 68, 0.8)'   // Red
          ],
          borderColor: '#0a0e16',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 10,
            cornerRadius: 4,
          }
        }
      }
    });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  formatResult(result: string): string {
    const map: Record<string, string> = {
      ACCEPTED: 'Accepted',
      WRONG_ANSWER: 'Wrong Answer',
      TIME_LIMIT_EXCEEDED: 'TLE',
      RUNTIME_ERROR: 'Runtime Error',
      COMPILATION_ERROR: 'Compile Error',
      PENDING: 'Pending',
    };
    return map[result] || result;
  }
}

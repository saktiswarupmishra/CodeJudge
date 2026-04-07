import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { LeaderboardEntry } from '../../core/models';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaderboard-page">
      <div class="page-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top performers ranked by problems solved, accuracy, and speed</p>
      </div>

      <div class="leaderboard-table">
        <div class="table-header">
          <span class="col rank">Rank</span>
          <span class="col name">Name</span>
          <span class="col solved">Solved</span>
          <span class="col accuracy">Accuracy</span>
          <span class="col time">Avg Time</span>
          <span class="col total">Submissions</span>
        </div>
        @for (entry of entries(); track entry.userId) {
          <div class="table-row" [class.gold]="entry.rank === 1" [class.silver]="entry.rank === 2" [class.bronze]="entry.rank === 3">
            <span class="col rank">
              @if (entry.rank === 1) { 🥇 }
              @else if (entry.rank === 2) { 🥈 }
              @else if (entry.rank === 3) { 🥉 }
              @else { {{ entry.rank }} }
            </span>
            <span class="col name">{{ entry.name }}</span>
            <span class="col solved">{{ entry.problemsSolved }}</span>
            <span class="col accuracy" [class.high]="entry.accuracy >= 70" [class.low]="entry.accuracy < 40">{{ entry.accuracy }}%</span>
            <span class="col time">{{ entry.avgExecutionTime }}ms</span>
            <span class="col total">{{ entry.totalSubmissions }}</span>
          </div>
        }
        @if (entries().length === 0) {
          <div class="empty">No data yet</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .leaderboard-page { max-width: 920px; margin: 0 auto; padding: 2rem; }

    .page-header h1 { color: var(--text-primary); margin: 0 0 0.3rem; font-size: 1.8rem; font-weight: 700; }
    .page-header p { color: var(--text-muted); margin: 0 0 1.5rem; font-size: 0.9rem; }

    .leaderboard-table {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .table-header {
      display: grid;
      grid-template-columns: 75px 1fr 90px 90px 100px 110px;
      padding: 0.7rem 1.2rem;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
      border-bottom: 1px solid var(--border-subtle);
    }

    .table-row {
      display: grid;
      grid-template-columns: 75px 1fr 90px 90px 100px 110px;
      padding: 0.8rem 1.2rem;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: 0.88rem;
      transition: background var(--transition-fast);
    }

    .table-row:last-child { border-bottom: none; }
    .table-row:hover { background: var(--bg-surface-hover); }

    .table-row.gold {
      background: rgba(255, 215, 0, 0.04);
      border-left: 3px solid #ffd700;
    }

    .table-row.silver {
      background: rgba(192, 192, 192, 0.04);
      border-left: 3px solid #c0c0c0;
    }

    .table-row.bronze {
      background: rgba(205, 127, 50, 0.04);
      border-left: 3px solid #cd7f32;
    }

    .col.rank { font-weight: 700; font-size: 1rem; }
    .col.name { font-weight: 500; }
    .col.solved { font-weight: 600; color: var(--accent-secondary); }
    .col.accuracy.high { color: var(--green-light); }
    .col.accuracy.low { color: var(--red-light); }
    .col.time { color: var(--text-secondary); }
    .col.total { color: var(--text-muted); }
    .empty { padding: 3rem; text-align: center; color: var(--text-muted); }
  `]
})
export class LeaderboardComponent implements OnInit {
  entries = signal<LeaderboardEntry[]>([]);

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.leaderboardService.getLeaderboard().subscribe({
      next: (res) => { if (res.success) this.entries.set(res.data || []); },
    });
  }
}

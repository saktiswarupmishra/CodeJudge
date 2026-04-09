import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PublicProfile } from '../../core/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="profile-page">
      @if (loading) {
        <div class="loading-state">
          <div class="loader"></div>
          <p>Loading profile...</p>
        </div>
      } @else if (profile) {
        <div class="profile-container">
          <!-- Left Sidebar: User Info -->
          <div class="profile-sidebar">
            <div class="avatar-large">
              {{ profile.avatarUrl ? '' : (profile.name.charAt(0) | uppercase) }}
            </div>
            <h1 class="user-name">{{ profile.name }}</h1>
            <div class="user-role badge">{{ profile.role }}</div>
            
            @if (profile.bio) {
              <p class="user-bio">{{ profile.bio }}</p>
            }

            <div class="join-date">
              <span class="icon">📅</span>
              Joined {{ formatDate(profile.createdAt) }}
            </div>

            <!-- Profile Stats -->
            <div class="stats-grid custom-scroll">
              <div class="stat-card">
                <div class="stat-val">{{ profile.totalSolved }}</div>
                <div class="stat-lbl">Problems Solved</div>
              </div>
              <div class="stat-card">
                <div class="stat-val">{{ profile.totalActivity }}</div>
                <div class="stat-lbl">Total Submissions</div>
              </div>
              <div class="stat-card">
                <div class="stat-val streak-val">🔥 {{ profile.currentStreak }}</div>
                <div class="stat-lbl">Current Streak</div>
              </div>
              <div class="stat-card">
                <div class="stat-val">⭐ {{ profile.maxStreak }}</div>
                <div class="stat-lbl">Max Streak</div>
              </div>
            </div>
          </div>

          <!-- Right Content: Activity Heatmap & Recent -->
          <div class="profile-main">
            <!-- Heatmap -->
            <div class="section-card">
              <div class="card-header">
                <h2>Activity Calendar</h2>
                <span class="subtitle">{{ profile.totalActivity }} submissions in the last year</span>
              </div>
              
              <div class="heatmap-container">
                <div class="heatmap-grid">
                  <!-- Empty slots for alignment if needed, but we'll render a simplified linear grid or actual 52x7 matrix -->
                  @for (week of heatmapGrid; track $index) {
                    <div class="heatmap-col">
                      @for (day of week; track day.date) {
                        <div class="heatmap-cell" 
                             [class]="getHeatmapClass(day.count)"
                             [title]="day.date + ': ' + day.count + ' submissions'">
                        </div>
                      }
                    </div>
                  }
                </div>
                <div class="heatmap-legend">
                  <span>Less</span>
                  <div class="heatmap-cell level-0"></div>
                  <div class="heatmap-cell level-1"></div>
                  <div class="heatmap-cell level-2"></div>
                  <div class="heatmap-cell level-3"></div>
                  <div class="heatmap-cell level-4"></div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="error-state">
          <div class="error-icon">😕</div>
          <h2>User Not Found</h2>
          <p>The user profile you are looking for does not exist.</p>
          <a routerLink="/" class="btn-primary">Return Home</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .profile-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-container {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
    }

    /* Sidebar */
    .profile-sidebar {
      flex: 0 0 300px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 2rem 1.5rem;
      text-align: center;
      position: sticky;
      top: 80px;
    }

    .avatar-large {
      width: 120px;
      height: 120px;
      background: var(--accent-gradient);
      border-radius: 50%;
      margin: 0 auto 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3.5rem;
      font-weight: 700;
      color: #fff;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
      border: 4px solid var(--bg-secondary);
    }

    .user-name {
      color: var(--text-primary);
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(99, 102, 241, 0.15);
      color: #a5b4fc;
      margin-bottom: 1.2rem;
    }

    .user-bio {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0 0 1.5rem;
      padding: 0 0.5rem;
    }

    .join-date {
      color: var(--text-muted);
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      margin-bottom: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;
    }

    .stat-card {
      background: rgba(0, 0, 0, 0.15);
      border: 1px solid var(--border-subtle);
      padding: 1rem 0.5rem;
      border-radius: var(--radius-md);
      transition: transform var(--transition-fast);
    }
    .stat-card:hover { border-color: var(--border-default); background: rgba(99,102,241,0.05); }

    .stat-val {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.2rem;
    }
    .streak-val { color: #f59e0b; }
    
    .stat-lbl {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Main Content */
    .profile-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
    }

    .card-header { margin-bottom: 1.5rem; }
    .card-header h2 { color: var(--text-primary); font-size: 1.25rem; font-weight: 700; margin: 0 0 0.3rem; }
    .card-header .subtitle { color: var(--text-muted); font-size: 0.85rem; }

    /* Heatmap */
    .heatmap-container {
      overflow-x: auto;
      padding-bottom: 1rem;
    }
    .heatmap-grid {
      display: flex;
      gap: 4px;
    }
    .heatmap-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .heatmap-cell {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255,255,255,0.02);
      transition: transform 0.1s;
    }
    .heatmap-cell:hover { transform: scale(1.2); z-index: 10; border-color: rgba(255,255,255,0.2); }
    
    .level-0 { background: rgba(255, 255, 255, 0.05); }
    .level-1 { background: rgba(34, 197, 94, 0.3); }
    .level-2 { background: rgba(34, 197, 94, 0.5); }
    .level-3 { background: rgba(34, 197, 94, 0.7); }
    .level-4 { background: rgba(34, 197, 94, 1); box-shadow: 0 0 8px rgba(34, 197, 94, 0.4); }

    .heatmap-legend {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 1rem;
      justify-content: flex-end;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .heatmap-legend .heatmap-cell { cursor: default; }
    .heatmap-legend .heatmap-cell:hover { transform: none; }

    .loading-state, .error-state {
      text-align: center;
      padding: 4rem 0;
    }
    .error-icon { font-size: 3rem; margin-bottom: 1rem; }
    .loader {
      width: 40px; height: 40px;
      border: 3px solid rgba(99, 102, 241, 0.2);
      border-top-color: var(--accent-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .btn-primary {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.6rem 1.5rem;
      background: var(--accent-gradient);
      color: #fff;
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 600;
    }

    @media (max-width: 850px) {
      .profile-container { flex-direction: column; }
      .profile-sidebar { flex: none; width: 100%; position: static; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: PublicProfile | null = null;
  loading = true;
  heatmapGrid: { date: string, count: number }[][] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProfile(id);
      }
    });
  }

  loadProfile(id: number) {
    this.loading = true;
    this.authService.getPublicProfile(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.profile = res.data;
          this.generateHeatmap(this.profile.activityMap);
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  generateHeatmap(activityMap: Record<string, number>) {
    // Generate last 52 weeks (364 days)
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    
    // Adjust start date to nearest Sunday to align grid perfectly
    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }
    
    this.heatmapGrid = [];
    let currentWeek: { date: string, count: number }[] = [];
    
    const iterDate = new Date(startDate);
    // Build weeks
    while (iterDate <= today) {
      const dateStr = iterDate.toISOString().split('T')[0];
      const count = activityMap[dateStr] || 0;
      
      currentWeek.push({ date: dateStr, count });
      
      if (currentWeek.length === 7) {
        this.heatmapGrid.push(currentWeek);
        currentWeek = [];
      }
      iterDate.setDate(iterDate.getDate() + 1);
    }
    
    // Push the last incomplete week
    if (currentWeek.length > 0) {
       this.heatmapGrid.push(currentWeek);
    }
  }

  getHeatmapClass(count: number): string {
    if (count === 0) return 'level-0';
    if (count >= 1 && count <= 2) return 'level-1';
    if (count >= 3 && count <= 5) return 'level-2';
    if (count >= 6 && count <= 9) return 'level-3';
    return 'level-4';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
}

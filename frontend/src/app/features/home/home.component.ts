import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProblemService } from '../../core/services/problem.service';
import { PlatformStats } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="badge-wrapper">
            <span class="version-badge">Version 2.0 is Live! 🚀</span>
          </div>
          <h1 class="hero-title">
            Master Algorithms.<br />
            <span class="accent">Ace Your Interviews.</span>
          </h1>
          <p class="hero-subtitle">
            The ultimate platform for competitive programming and interview preparation.
            Practice thousands of problems, track your progress, and get better every day.
          </p>
          <div class="hero-actions">
            <a routerLink="/problems" class="btn btn-primary">Start Coding Now</a>
            <a routerLink="/leaderboard" class="btn btn-secondary">View Leaderboard</a>
          </div>
        </div>
        
        <!-- Platform Stats Cards -->
        @if (stats) {
          <div class="stats-banner">
            <div class="stat-item">
              <span class="val">{{ stats.totalUsers | number }}</span>
              <span class="lbl">Registered Users</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="val">{{ stats.totalProblems | number }}</span>
              <span class="lbl">Coding Problems</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="val">{{ stats.totalSubmissions | number }}</span>
              <span class="lbl">Code Submissions</span>
            </div>
          </div>
        }
      </section>

      <!-- Topics Grid -->
      <section class="features-section">
        <h2 class="section-title">Explore by Topics</h2>
        <p class="section-desc">Master specific data structures and algorithms</p>
        
        <div class="topics-grid">
          <a [routerLink]="['/problems']" [queryParams]="{tag: 'Array'}" class="topic-card">
            <div class="topic-icon">📊</div>
            <h3>Arrays & Hashing</h3>
            <p>Master the fundamentals of data storage and fast lookups.</p>
          </a>
          <a [routerLink]="['/problems']" [queryParams]="{tag: 'Two Pointers'}" class="topic-card">
            <div class="topic-icon">👉👈</div>
            <h3>Two Pointers</h3>
            <p>Optimize array and string traversal algorithms.</p>
          </a>
          <a [routerLink]="['/problems']" [queryParams]="{tag: 'Dynamic Programming'}" class="topic-card">
            <div class="topic-icon">🧠</div>
            <h3>Dynamic Programming</h3>
            <p>Solve complex problems by breaking them down into subproblems.</p>
          </a>
          <a [routerLink]="['/problems']" [queryParams]="{tag: 'Tree'}" class="topic-card">
            <div class="topic-icon">🌲</div>
            <h3>Trees & Graphs</h3>
            <p>Traverse hierarchical and relational data structures.</p>
          </a>
        </div>
      </section>
      
      <!-- Supported Languages -->
      <section class="languages-section">
        <h2 class="section-title">Code in Your Favorite Language</h2>
        <div class="lang-glass-container">
          <div class="lang-pill"><span class="icon">🐍</span> Python</div>
          <div class="lang-pill"><span class="icon">☕</span> Java</div>
          <div class="lang-pill"><span class="icon">⚙️</span> C++</div>
          <div class="lang-pill"><span class="icon">📜</span> JavaScript</div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2024 CodeJudge Platform. Built for developers by developers.</p>
      </footer>
    </div>
  `,
  styles: [`
    .home-page { }

    .hero-section {
      padding: 6rem 1rem 4rem;
      text-align: center;
      position: relative;
      background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
    }

    .badge-wrapper {
      margin-bottom: 1.5rem;
    }

    .version-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: var(--accent-secondary);
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      line-height: 1.1;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 1.5rem;
      letter-spacing: -0.02em;
    }

    .accent {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto 2.5rem;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 4rem;
    }

    .btn {
      padding: 0.8rem 1.8rem;
      border-radius: var(--radius-md);
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all var(--transition-fast);
    }

    .btn-primary {
      background: var(--accent-gradient);
      color: #fff;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
      border: 1px solid var(--border-default);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--border-strong);
    }

    /* Stats Banner */
    .stats-banner {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2.5rem;
      max-width: 800px;
      margin: 0 auto;
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      backdrop-filter: blur(10px);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    
    .stat-divider {
      width: 1px;
      height: 40px;
      background: var(--border-subtle);
    }

    .stat-item .val {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.2rem;
    }

    .stat-item .lbl {
      color: var(--text-muted);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Topics grid */
    .features-section {
      padding: 5rem 2rem;
      max-width: 1100px;
      margin: 0 auto;
      text-align: center;
    }

    .section-title {
      font-size: 2.2rem;
      color: var(--text-primary);
      margin: 0 0 0.5rem;
    }

    .section-desc {
      color: var(--text-muted);
      margin: 0 0 3rem;
      font-size: 1.1rem;
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .topic-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 2rem 1.5rem;
      border-radius: var(--radius-lg);
      text-align: left;
      text-decoration: none;
      transition: transform 0.2s, border-color 0.2s;
      display: flex;
      flex-direction: column;
    }

    .topic-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-primary);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .topic-icon {
      font-size: 2.5rem;
      margin-bottom: 1.2rem;
      background: rgba(255,255,255,0.05);
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
    }

    .topic-card h3 {
      color: var(--text-primary);
      font-size: 1.2rem;
      margin: 0 0 0.8rem;
    }

    .topic-card p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }

    .languages-section {
      text-align: center;
      padding: 4rem 2rem 6rem;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2));
    }

    .lang-glass-container {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .lang-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      padding: 0.8rem 1.5rem;
      border-radius: 30px;
      color: var(--text-primary);
      font-weight: 600;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      transition: all 0.3s ease;
    }
    
    .lang-pill:hover {
      background: rgba(255,255,255,0.1);
      transform: scale(1.05);
      border-color: rgba(255,255,255,0.2);
    }
    
    .lang-pill .icon { font-size: 1.3rem; }

    .footer {
      text-align: center;
      padding: 2rem;
      border-top: 1px solid var(--border-subtle);
      color: var(--text-muted);
      font-size: 0.9rem;
      background: rgba(0,0,0,0.5);
    }
  `]
})
export class HomeComponent implements OnInit {
  stats: PlatformStats | null = null;
  
  constructor(private problemService: ProblemService) {}

  ngOnInit() {
    this.problemService.getPlatformStats().subscribe({
      next: (res) => {
        if(res.success) this.stats = res.data!;
      }
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">🚀 Open Source Coding Platform</div>
          <h1>Master Algorithms.<br><span class="gradient-text">Ace the Interview.</span></h1>
          <p class="tagline">Practice 1000+ coding problems, compete with developers worldwide, and sharpen your problem-solving skills with real-time feedback.</p>
          <div class="hero-actions">
            @if (auth.isLoggedIn()) {
              <a routerLink="/problems" class="btn-hero">Start Practicing</a>
              <a routerLink="/dashboard" class="btn-hero-outline">My Dashboard</a>
            } @else {
              <a routerLink="/register" class="btn-hero">Get Started Free</a>
              <a routerLink="/login" class="btn-hero-outline">Sign In</a>
            }
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-block">
            <div class="code-header">
              <div class="dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
              <span class="code-filename">solution.py</span>
            </div>
            <pre><code><span class="kw">def</span> <span class="fn">two_sum</span>(nums, target):
    lookup = {{ '{' }}{{ '}' }}
    <span class="kw">for</span> i, n <span class="kw">in</span> enumerate(nums):
        <span class="kw">if</span> target - n <span class="kw">in</span> lookup:
            <span class="kw">return</span> [lookup[target-n], i]
        lookup[n] = i</code></pre>
            <div class="code-footer">
              <span class="result-badge">✅ Accepted</span>
              <span class="time-badge">⏱ 45ms</span>
            </div>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="feature-card">
          <div class="feature-icon-wrap"><span class="feature-icon">🧩</span></div>
          <h3>Curated Problems</h3>
          <p>Hand-picked coding challenges from Easy to Hard, including SQL</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap"><span class="feature-icon">⚡</span></div>
          <h3>Fast Execution</h3>
          <p>Docker-sandboxed code execution in under 2 seconds</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap"><span class="feature-icon">🏆</span></div>
          <h3>Leaderboard</h3>
          <p>Compete with others and climb the global rankings</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap"><span class="feature-icon">🔒</span></div>
          <h3>Secure</h3>
          <p>Isolated execution with CPU & memory limits</p>
        </div>
      </section>

      <section class="languages">
        <h2>Supported Languages</h2>
        <div class="lang-grid">
          <div class="lang-item"><span class="lang-icon">🐍</span> Python</div>
          <div class="lang-item"><span class="lang-icon">⚙️</span> C++</div>
          <div class="lang-item"><span class="lang-icon">☕</span> Java</div>
          <div class="lang-item"><span class="lang-icon">🟨</span> JavaScript</div>
        </div>
      </section>

      <footer class="site-footer">
        <p>Built with ❤️ for developers · CodeJudge © 2026</p>
      </footer>
    </div>
  `,
  styles: [`
    .home { max-width: 1120px; margin: 0 auto; padding: 2rem; }

    /* ── Hero ──────────────────────────────── */
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      padding: 4rem 0 3rem;
    }

    .hero-badge {
      display: inline-block;
      background: var(--accent-glow);
      border: 1px solid rgba(99, 102, 241, 0.25);
      color: #a5b4fc;
      padding: 0.3rem 0.9rem;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
      margin-bottom: 1.2rem;
      letter-spacing: 0.02em;
    }

    .hero-content h1 {
      font-size: 3.2rem;
      color: var(--text-primary);
      margin: 0 0 1.2rem;
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: linear-gradient(135deg, #818cf8, #a78bfa, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .tagline {
      color: var(--text-secondary);
      margin: 0 0 2rem;
      line-height: 1.7;
      font-size: 1.05rem;
    }

    .hero-actions { display: flex; gap: 0.8rem; }

    .btn-hero {
      padding: 0.75rem 1.8rem;
      background: var(--accent-gradient);
      color: #fff;
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 0.95rem;
      transition: transform var(--transition-fast), box-shadow var(--transition-base);
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25);
    }

    .btn-hero:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
    }

    .btn-hero-outline {
      padding: 0.75rem 1.8rem;
      border: 1px solid var(--border-strong);
      color: var(--text-primary);
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 500;
      font-size: 0.95rem;
      transition: background var(--transition-fast), border-color var(--transition-fast);
    }

    .btn-hero-outline:hover {
      background: var(--bg-surface-hover);
      border-color: rgba(99, 102, 241, 0.3);
    }

    /* ── Code Block ───────────────────────── */
    .hero-visual { display: flex; justify-content: center; }

    .code-block {
      background: #0d1117;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-elevated), 0 0 60px rgba(99, 102, 241, 0.08);
      width: 100%;
      border: 1px solid var(--border-subtle);
    }

    .code-header {
      padding: 0.7rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      display: flex;
      align-items: center;
      gap: 0.8rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    .dots { display: flex; gap: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }

    .code-filename {
      color: var(--text-muted);
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
    }

    .code-block pre {
      padding: 1.2rem 1.2rem;
      margin: 0;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.75;
    }

    .kw { color: #c792ea; }
    .fn { color: #82aaff; }

    .code-footer {
      padding: 0.6rem 1rem;
      background: rgba(34, 197, 94, 0.06);
      border-top: 1px solid rgba(34, 197, 94, 0.1);
      display: flex;
      gap: 0.8rem;
      font-size: 0.78rem;
    }

    .result-badge { color: var(--green-light); font-weight: 600; }
    .time-badge { color: var(--text-muted); }

    /* ── Features ──────────────────────────── */
    .features {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
      padding: 2rem 0 3rem;
    }

    .feature-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      text-align: center;
      transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
    }

    .feature-card:hover {
      transform: translateY(-4px);
      border-color: rgba(99, 102, 241, 0.25);
      box-shadow: var(--shadow-glow);
    }

    .feature-icon-wrap {
      width: 48px;
      height: 48px;
      margin: 0 auto 0.8rem;
      border-radius: var(--radius-md);
      background: var(--bg-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon { font-size: 1.5rem; }

    .feature-card h3 {
      color: var(--text-primary);
      margin: 0 0 0.4rem;
      font-size: 0.95rem;
      font-weight: 600;
    }

    .feature-card p {
      color: var(--text-muted);
      margin: 0;
      font-size: 0.82rem;
      line-height: 1.5;
    }

    /* ── Languages ─────────────────────────── */
    .languages {
      text-align: center;
      padding: 2rem 0 3rem;
    }

    .languages h2 {
      color: var(--text-primary);
      margin-bottom: 1.2rem;
      font-size: 1.3rem;
      font-weight: 700;
    }

    .lang-grid {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .lang-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.95rem;
      font-weight: 500;
      background: var(--bg-surface);
      padding: 0.7rem 1.3rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-subtle);
      transition: border-color var(--transition-fast);
    }

    .lang-item:hover {
      border-color: var(--border-default);
    }

    .lang-icon { font-size: 1.2rem; }

    /* ── Footer ─────────────────────────────── */
    .site-footer {
      text-align: center;
      padding: 2rem 0;
      border-top: 1px solid var(--border-subtle);
      margin-top: 1rem;
    }

    .site-footer p {
      color: var(--text-dim);
      font-size: 0.82rem;
    }

    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; }
      .hero-content h1 { font-size: 2.2rem; }
      .features { grid-template-columns: repeat(2, 1fr); }
      .lang-grid { flex-wrap: wrap; }
    }
  `]
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}

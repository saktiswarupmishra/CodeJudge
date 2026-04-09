import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="nav-brand">
        <span class="brand-icon">⚡</span>
        <span class="brand-text">Code<span class="accent">Judge</span></span>
      </a>
      <div class="nav-links">
        <a routerLink="/problems" routerLinkActive="active" class="nav-link">Problems</a>
        <a routerLink="/leaderboard" routerLinkActive="active" class="nav-link">Leaderboard</a>
        @if (auth.isLoggedIn()) {
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">Dashboard</a>
          @if (auth.isAdmin()) {
            <a routerLink="/admin" routerLinkActive="active" class="nav-link admin-link">Admin</a>
          }
          <div class="nav-divider"></div>
          <div class="nav-user">
            <span class="user-avatar">{{ auth.user()?.name?.charAt(0) || 'U' }}</span>
            <a [routerLink]="['/profile', auth.user()?.id]" class="user-name profile-link">{{ auth.user()?.name }}</a>
            <button class="btn-logout" (click)="auth.logout()">Logout</button>
          </div>
        } @else {
          <div class="nav-divider"></div>
          <a routerLink="/login" class="btn-nav-login">Sign In</a>
        }
      </div>
    </nav>
    <main class="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 60px;
      background: rgba(10, 14, 26, 0.85);
      backdrop-filter: blur(16px) saturate(180%);
      border-bottom: 1px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }

    .brand-icon {
      font-size: 1.4rem;
      filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.5));
    }

    .brand-text {
      color: var(--text-primary);
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .accent {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.4rem 0.85rem;
      border-radius: var(--radius-sm);
      transition: color var(--transition-fast), background var(--transition-fast);
      position: relative;
    }

    .nav-link:hover {
      color: var(--text-primary);
      background: var(--bg-surface-hover);
    }

    .nav-link.active {
      color: var(--text-primary);
      background: rgba(99, 102, 241, 0.1);
    }

    .admin-link.active, .admin-link:hover {
      color: var(--red-light) !important;
      background: var(--red-bg);
    }

    .nav-divider {
      width: 1px;
      height: 20px;
      background: var(--border-default);
      margin: 0 0.5rem;
    }

    .nav-user {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .user-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      color: #fff;
    }

    .user-name {
      color: var(--text-secondary);
      font-size: 0.85rem;
      font-weight: 500;
      text-decoration: none;
      transition: color var(--transition-fast);
    }
    
    .profile-link:hover {
      color: var(--accent-primary);
      text-decoration: underline;
    }

    .btn-logout {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      color: var(--text-muted);
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.78rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .btn-logout:hover {
      background: var(--bg-surface-hover);
      color: var(--text-primary);
      border-color: var(--border-strong);
    }

    .btn-nav-login {
      background: var(--accent-gradient);
      padding: 0.4rem 1.1rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 0.85rem;
      color: #fff !important;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    .btn-nav-login:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-glow);
    }

    .main-content {
      min-height: calc(100vh - 60px);
    }
  `]
})
export class App {
  constructor(public auth: AuthService) {}
}

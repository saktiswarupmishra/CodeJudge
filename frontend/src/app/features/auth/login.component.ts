import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo">⚡</div>
          <h1>Code<span class="accent">Judge</span></h1>
          <p>Sign in to your account</p>
        </div>
        <form (ngSubmit)="onLogin()" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" [(ngModel)]="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required />
          </div>
          @if (error()) {
            <div class="error-msg">{{ error() }}</div>
          }
          <button type="submit" class="btn-primary" [disabled]="loading()">
            {{ loading() ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        <p class="auth-footer">Don't have an account? <a routerLink="/register">Sign up</a></p>
        <div class="demo-accounts">
          <p>Demo Accounts:</p>
          <button class="demo-btn" (click)="fillDemo('admin@codejudge.com', 'admin123')">Admin</button>
          <button class="demo-btn" (click)="fillDemo('john@codejudge.com', 'user123')">User</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: calc(100vh - 60px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .auth-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(24px) saturate(150%);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      width: 400px;
      box-shadow: var(--shadow-elevated);
    }

    .auth-header { text-align: center; margin-bottom: 1.8rem; }

    .logo {
      font-size: 2.5rem;
      margin-bottom: 0.4rem;
      filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.4));
    }

    h1 {
      color: var(--text-primary);
      font-size: 1.6rem;
      font-weight: 700;
      margin: 0 0 0.4rem;
    }

    .accent {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p { color: var(--text-muted); margin: 0; font-size: 0.88rem; }

    .form-group { margin-bottom: 1rem; }

    label {
      display: block;
      color: var(--text-secondary);
      margin-bottom: 0.35rem;
      font-size: 0.85rem;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.7rem 0.9rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.92rem;
      outline: none;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
      box-sizing: border-box;
    }

    input:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    input::placeholder { color: var(--text-dim); }

    .btn-primary {
      width: 100%;
      padding: 0.8rem;
      background: var(--accent-gradient);
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform var(--transition-fast), box-shadow var(--transition-base);
      margin-top: 0.5rem;
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
    }

    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

    .error-msg {
      background: var(--red-bg);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #fca5a5;
      padding: 0.6rem 0.8rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.8rem;
      font-size: 0.82rem;
      text-align: center;
    }

    .auth-footer {
      text-align: center;
      margin-top: 1.3rem;
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .auth-footer a { color: var(--accent-secondary); font-weight: 500; }

    .demo-accounts {
      margin-top: 1.2rem;
      text-align: center;
      border-top: 1px solid var(--border-subtle);
      padding-top: 0.8rem;
    }

    .demo-accounts p { font-size: 0.75rem; margin-bottom: 0.4rem; }

    .demo-btn {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      color: #a5b4fc;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      margin: 0 0.2rem;
      font-size: 0.78rem;
      font-weight: 500;
      transition: background var(--transition-fast), border-color var(--transition-fast);
    }

    .demo-btn:hover {
      background: rgba(99, 102, 241, 0.12);
      border-color: var(--accent-primary);
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  fillDemo(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  onLogin() {
    this.loading.set(true);
    this.error.set('');
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success) {
          this.router.navigate(['/']);
        } else {
          this.error.set(res.error || 'Login failed');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.error || 'Login failed');
      },
    });
  }
}

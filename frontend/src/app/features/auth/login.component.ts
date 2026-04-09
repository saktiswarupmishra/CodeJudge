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
        
        <div class="login-tabs">
          <button type="button" class="tab-btn" [class.active]="loginMethod() === 'email'" (click)="loginMethod.set('email')">Email</button>
          <button type="button" class="tab-btn" [class.active]="loginMethod() === 'mobile'" (click)="loginMethod.set('mobile')">Mobile</button>
        </div>

        <form (ngSubmit)="loginMethod() === 'email' ? onLogin() : null" class="auth-form">
          @if (loginMethod() === 'email') {
            <div class="form-group">
              <label for="email">Email ID</label>
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
          } @else {
            @if (!otpMode()) {
              <div class="form-group">
                <label for="mobile">Mobile Number</label>
                <div class="mobile-input-group">
                  <select [(ngModel)]="selectedCountryCode" name="countryCode" class="country-select">
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                  </select>
                  <input id="mobile" type="tel" [(ngModel)]="mobile" name="mobile" placeholder="234 567 8900" required />
                </div>
              </div>
              @if (error()) {
                <div class="error-msg">{{ error() }}</div>
              }
              <button type="button" class="btn-primary" (click)="requestOtp()" [disabled]="!mobile || loading()">
                {{ loading() ? 'Sending...' : 'Get OTP' }}
              </button>
            } @else {
               <div class="form-group">
                 <label for="otp">Enter OTP for {{ selectedCountryCode }} {{ mobile }}</label>
                 <input id="otp" type="text" [(ngModel)]="otp" name="otp" placeholder="Enter 6-digit OTP" required />
               </div>
               @if (error()) {
                 <div class="error-msg">{{ error() }}</div>
               }
               <button type="button" class="btn-primary" (click)="verifyOtp()" [disabled]="!otp || loading()">
                 {{ loading() ? 'Verifying...' : 'Verify & Login' }}
               </button>
               <button type="button" class="btn-secondary" (click)="otpMode.set(false)" style="margin-top: 10px;">
                 Back
               </button>
            }
          }
        </form>

        <div class="divider">
          <span>Or continue with</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-btn google-btn" (click)="socialLogin('Google')">
            <svg viewBox="0 0 24 24" class="social-icon"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button type="button" class="social-btn apple-btn" (click)="socialLogin('Apple')">
            <svg viewBox="0 0 24 24" class="social-icon"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.09 2.4-.88 3.93-.76 1.41.07 2.6.59 3.44 1.57-2.9 1.63-2.4 5.61.42 6.8-.75 1.95-1.57 3.63-2.87 4.58zm-3.98-14.4c.14-1.55-1-2.92-2.45-3.2-1.36 1.54-.42 3.31 2.45 3.2z"/></svg>
            Apple
          </button>
        </div>

        <p class="auth-footer">Don't have an account? <a routerLink="/register">Sign up</a></p>
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

    .auth-header { text-align: center; margin-bottom: 1.5rem; }

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

    .login-tabs {
      display: flex;
      background: rgba(255,255,255,0.05);
      border-radius: var(--radius-md);
      padding: 0.3rem;
      margin-bottom: 1.5rem;
    }

    .tab-btn {
      flex: 1;
      padding: 0.6rem;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn.active {
      background: var(--bg-surface);
      color: var(--text-primary);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

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

    .btn-secondary {
      width: 100%;
      padding: 0.8rem;
      background: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--border-strong);
    }
    
    .mobile-input-group {
      display: flex;
      gap: 0.5rem;
    }
    
    .country-select {
      width: 80px;
      padding: 0.7rem 0.5rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.92rem;
      outline: none;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
      box-sizing: border-box;
    }
    
    .country-select:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 1.5rem 0;
    }

    .divider::before, .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid var(--border-subtle);
    }

    .divider span {
      padding: 0 10px;
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .social-login {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .social-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.7rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .social-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--border-strong);
    }

    .social-icon {
      width: 18px;
      height: 18px;
    }
    
    .apple-btn .social-icon {
      color: #fff;
    }

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
  `]
})
export class LoginComponent {
  loginMethod = signal<'email' | 'mobile'>('email');
  email = '';
  mobile = '';
  password = '';
  selectedCountryCode = '+1';
  otpMode = signal(false);
  otp = '';
  generatedOtp = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

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

  requestOtp() {
    if (!this.mobile) {
      this.error.set('Please enter a valid mobile number');
      return;
    }
    this.error.set('');
    // Generate a 6-digit random OTP
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpMode.set(true);
    // Show pop up with the generated OTP to test the login
    window.alert(`Demo OTP for ${this.selectedCountryCode} ${this.mobile}: ${this.generatedOtp}`);
  }

  verifyOtp() {
    if (this.otp !== this.generatedOtp) {
      this.error.set('Invalid OTP. Please try again.');
      return;
    }
    this.loading.set(true);
    // Using a seeded demo account for successful mobile login demo functionality
    this.auth.login('john@codejudge.com', 'user123').subscribe({
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

  socialLogin(provider: string) {
    this.error.set(`${provider} login will be implemented soon.`);
  }
}

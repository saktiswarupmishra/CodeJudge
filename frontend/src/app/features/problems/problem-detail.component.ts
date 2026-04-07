import { Component, OnInit, OnDestroy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProblemService } from '../../core/services/problem.service';
import { SubmissionService } from '../../core/services/submission.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';
import { Problem, Submission } from '../../core/models';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="editor-page">
      <!-- Left Panel: Problem Description -->
      <div class="left-panel">
        @if (problem()) {
          <div class="problem-info">
            <div class="problem-header">
              <h2>{{ problem()!.id }}. {{ problem()!.title }}</h2>
              <span class="badge" [class]="problem()!.difficulty.toLowerCase()">{{ problem()!.difficulty }}</span>
            </div>
            <div class="tags-row">
              @for (tag of parseTags(problem()!.tags); track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>
            <div class="description" [innerHTML]="formatDescription(problem()!.description)"></div>
            @if (problem()!.constraints) {
              <div class="section">
                <h3>Constraints</h3>
                <pre class="constraints">{{ problem()!.constraints }}</pre>
              </div>
            }
            @if (problem()!.testCases && problem()!.testCases!.length > 0) {
              <div class="section">
                <h3>Sample Test Cases</h3>
                @for (tc of problem()!.testCases; track tc.id) {
                  <div class="test-case">
                    <div class="tc-row"><strong>Input:</strong><pre>{{ tc.input }}</pre></div>
                    <div class="tc-row"><strong>Output:</strong><pre>{{ tc.output }}</pre></div>
                  </div>
                }
              </div>
            }
          </div>
        } @else {
          <div class="loading">Loading problem...</div>
        }

        <!-- Submission History -->
        <div class="submissions-panel">
          <h3>📋 My Submissions</h3>
          @for (sub of submissions(); track sub.id) {
            <div class="sub-row" [class]="sub.result.toLowerCase().replace('_', '-')">
              <span class="sub-result">{{ formatResult(sub.result) }}</span>
              <span class="sub-lang">{{ sub.language }}</span>
              <span class="sub-time">{{ sub.executionTime ? sub.executionTime + 'ms' : '-' }}</span>
            </div>
          }
          @if (submissions().length === 0) {
            <p class="no-subs">No submissions yet</p>
          }
        </div>
      </div>

      <!-- Right Panel: Code Editor -->
      <div class="right-panel">
        <div class="editor-toolbar">
          <select [(ngModel)]="selectedLanguage" class="lang-select" (change)="onLanguageChange()">
            <option value="PYTHON">Python</option>
            <option value="CPP">C++</option>
            <option value="JAVA">Java</option>
            <option value="JAVASCRIPT">JavaScript</option>
          </select>
          <div class="toolbar-actions">
            <button class="btn-icon" (click)="toggleTheme()" title="Toggle theme">
              {{ darkTheme ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>

        <div class="code-editor">
          <textarea
            [(ngModel)]="code"
            class="code-textarea"
            [class.dark]="darkTheme"
            (input)="autoSave()"
            spellcheck="false"
            placeholder="Write your code here..."
          ></textarea>
        </div>

        <div class="editor-footer">
          <div class="btn-group">
            <button class="btn-run" (click)="onRun()" [disabled]="running()">
              {{ running() ? '⏳ Running...' : '▶ Run' }}
            </button>
            <button class="btn-submit" (click)="onSubmit()" [disabled]="running()">
              {{ running() ? '⏳ ...' : '🚀 Submit' }}
            </button>
          </div>
        </div>

        <!-- Output Panel -->
        @if (output()) {
          <div class="output-panel" [class]="outputClass()">
            <div class="output-header">
              <span class="output-status">{{ outputStatus() }}</span>
              @if (executionTime()) {
                <span class="output-meta">⏱ {{ executionTime() }}ms</span>
              }
            </div>
            <pre class="output-content">{{ output() }}</pre>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .editor-page { display: grid; grid-template-columns: 1fr 1fr; height: calc(100vh - 60px); gap: 0; }

    .left-panel {
      overflow-y: auto;
      padding: 1.5rem;
      border-right: 1px solid var(--border-subtle);
      background: rgba(0, 0, 0, 0.15);
    }

    .right-panel { display: flex; flex-direction: column; overflow: hidden; }

    .problem-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; }
    .problem-header h2 { color: var(--text-primary); margin: 0; font-size: 1.35rem; font-weight: 700; }

    .badge { padding: 0.18rem 0.55rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
    .badge.easy { background: var(--green-bg); color: var(--green-light); }
    .badge.medium { background: var(--yellow-bg); color: var(--yellow-light); }
    .badge.hard { background: var(--red-bg); color: var(--red-light); }

    .tags-row { display: flex; gap: 0.4rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
    .tag { background: rgba(99, 102, 241, 0.1); color: #a5b4fc; padding: 0.12rem 0.45rem; border-radius: 3px; font-size: 0.72rem; font-weight: 500; }

    .description { color: var(--text-secondary); line-height: 1.75; font-size: 0.92rem; }
    .description :deep(code) { background: rgba(255, 255, 255, 0.08); padding: 0.15rem 0.4rem; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.85em; }
    .description :deep(pre) { background: rgba(0, 0, 0, 0.3); padding: 1rem; border-radius: var(--radius-md); overflow-x: auto; border: 1px solid var(--border-subtle); }

    .section { margin-top: 1.5rem; }
    .section h3 { color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 0.7rem; font-weight: 600; }

    .constraints {
      background: rgba(0, 0, 0, 0.2);
      padding: 0.7rem 0.9rem;
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      font-size: 0.82rem;
      white-space: pre-wrap;
      border: 1px solid var(--border-subtle);
    }

    .test-case {
      background: rgba(0, 0, 0, 0.2);
      border-radius: var(--radius-md);
      padding: 0.7rem 0.9rem;
      margin-bottom: 0.6rem;
      border: 1px solid var(--border-subtle);
    }

    .tc-row { margin-bottom: 0.35rem; }
    .tc-row strong { color: var(--text-muted); font-size: 0.75rem; display: block; margin-bottom: 0.15rem; }
    .tc-row pre { margin: 0; color: var(--text-primary); font-size: 0.82rem; }

    .submissions-panel { margin-top: 1.5rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem; }
    .submissions-panel h3 { color: var(--text-muted); font-size: 0.82rem; margin-bottom: 0.7rem; font-weight: 600; }

    .sub-row {
      display: flex;
      justify-content: space-between;
      padding: 0.45rem 0.7rem;
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      margin-bottom: 0.3rem;
      font-size: 0.82rem;
    }

    .sub-row.accepted .sub-result { color: var(--green-light); }
    .sub-row.wrong-answer .sub-result { color: var(--red-light); }
    .sub-row.time-limit-exceeded .sub-result { color: var(--yellow-light); }
    .sub-row.runtime-error .sub-result { color: #fb923c; }
    .sub-row.pending .sub-result { color: #94a3b8; }
    .sub-lang { color: var(--text-muted); }
    .sub-time { color: var(--text-muted); }
    .no-subs { color: var(--text-dim); font-size: 0.82rem; }

    .editor-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid var(--border-subtle);
    }

    .lang-select {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      color: var(--text-primary);
      padding: 0.35rem 0.7rem;
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
      cursor: pointer;
    }

    .lang-select option { background: var(--bg-secondary); color: var(--text-primary); }

    .toolbar-actions { display: flex; gap: 0.4rem; }

    .btn-icon {
      background: transparent;
      border: 1px solid var(--border-subtle);
      padding: 0.35rem 0.5rem;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.9rem;
      transition: background var(--transition-fast);
    }

    .btn-icon:hover { background: var(--bg-surface-hover); }

    .code-editor { flex: 1; overflow: hidden; }

    .code-textarea {
      width: 100%;
      height: 100%;
      padding: 1rem;
      background: #0d1117;
      color: #e2e8f0;
      border: none;
      font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
      font-size: 13.5px;
      line-height: 1.65;
      resize: none;
      outline: none;
      tab-size: 4;
      box-sizing: border-box;
    }

    .code-textarea.dark { background: #080c14; color: #c9d1d9; }
    .code-textarea::placeholder { color: var(--text-dim); }

    .editor-footer {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem 1rem;
      background: rgba(0, 0, 0, 0.3);
      border-top: 1px solid var(--border-subtle);
    }

    .btn-group { display: flex; gap: 0.4rem; }

    .btn-run {
      padding: 0.45rem 1.1rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      color: var(--text-primary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .btn-run:hover { background: var(--bg-surface-hover); border-color: var(--border-strong); }

    .btn-submit {
      padding: 0.45rem 1.1rem;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border: none;
      color: #fff;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 600;
      transition: all var(--transition-fast);
    }

    .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3); }
    .btn-run:disabled, .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    .output-panel {
      padding: 0.8rem 1rem;
      border-top: 1px solid var(--border-subtle);
      max-height: 200px;
      overflow-y: auto;
    }

    .output-panel.success { background: rgba(34, 197, 94, 0.06); }
    .output-panel.error { background: rgba(239, 68, 68, 0.06); }
    .output-panel.warning { background: rgba(245, 158, 11, 0.06); }
    .output-panel.pending { background: rgba(148, 163, 184, 0.06); }

    .output-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
    .output-status { font-weight: 700; font-size: 0.88rem; }
    .output-meta { color: var(--text-muted); font-size: 0.78rem; }
    .output-content { margin: 0; color: var(--text-secondary); font-size: 0.82rem; white-space: pre-wrap; }
    .loading { color: var(--text-muted); padding: 2rem; text-align: center; }
  `]
})
export class ProblemDetailComponent implements OnInit, OnDestroy {
  problem = signal<Problem | null>(null);
  submissions = signal<Submission[]>([]);
  code = '';
  selectedLanguage = 'PYTHON';
  darkTheme = true;
  running = signal(false);
  output = signal('');
  outputStatus = signal('');
  outputClass = signal('');
  executionTime = signal<number | null>(null);

  private autoSaveTimer: any;
  private pollTimer: any;

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private submissionService: SubmissionService,
    private wsService: WebSocketService,
    private authService: AuthService
  ) {
    effect(() => {
      const update = this.wsService.lastUpdate();
      if (update && update.problemId === this.problem()?.id) {
        this.handleSubmissionUpdate(update);
      }
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProblem(id);
    this.loadSubmissions(id);
    this.loadSavedCode(id);

    const user = this.authService.user();
    if (user) {
      this.wsService.connect(user.id);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.autoSaveTimer);
    clearInterval(this.pollTimer);
  }

  loadProblem(id: number) {
    this.problemService.getById(id).subscribe({
      next: (res) => { if (res.success) this.problem.set(res.data!); },
    });
  }

  loadSubmissions(problemId: number) {
    this.submissionService.getByProblem(problemId).subscribe({
      next: (res) => { if (res.success) this.submissions.set(res.data || []); },
    });
  }

  onRun() {
    this.running.set(true);
    this.output.set('Running...');
    this.outputStatus.set('⏳ Running');
    this.outputClass.set('pending');
    this.executionTime.set(null);

    this.submissionService.run({
      problemId: this.problem()!.id,
      code: this.code,
      language: this.selectedLanguage,
    }).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.pollSubmission(res.data.id);
        }
      },
      error: () => {
        this.running.set(false);
        this.output.set('Failed to submit');
        this.outputClass.set('error');
        this.outputStatus.set('❌ Error');
      },
    });
  }

  onSubmit() {
    this.running.set(true);
    this.output.set('Submitting...');
    this.outputStatus.set('⏳ Evaluating');
    this.outputClass.set('pending');
    this.executionTime.set(null);

    this.submissionService.submit({
      problemId: this.problem()!.id,
      code: this.code,
      language: this.selectedLanguage,
    }).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.pollSubmission(res.data.id);
        }
      },
      error: () => {
        this.running.set(false);
        this.output.set('Failed to submit');
        this.outputClass.set('error');
        this.outputStatus.set('❌ Error');
      },
    });
  }

  private pollSubmission(id: number) {
    let attempts = 0;
    this.pollTimer = setInterval(() => {
      attempts++;
      this.submissionService.getById(id).subscribe({
        next: (res) => {
          if (res.success && res.data && res.data.result !== 'PENDING') {
            clearInterval(this.pollTimer);
            this.handleSubmissionUpdate(res.data);
          }
        },
      });
      if (attempts > 30) {
        clearInterval(this.pollTimer);
        this.running.set(false);
        this.output.set('Execution timed out');
        this.outputClass.set('warning');
        this.outputStatus.set('⏰ Timeout');
      }
    }, 2000);
  }

  private handleSubmissionUpdate(data: any) {
    this.running.set(false);
    this.output.set(data.output || data.result);
    this.executionTime.set(data.executionTime);
    this.outputStatus.set(this.formatResult(data.result));

    switch (data.result) {
      case 'ACCEPTED': this.outputClass.set('success'); break;
      case 'WRONG_ANSWER': this.outputClass.set('error'); break;
      case 'TIME_LIMIT_EXCEEDED': this.outputClass.set('warning'); break;
      default: this.outputClass.set('error');
    }

    if (this.problem()) {
      this.loadSubmissions(this.problem()!.id);
    }
  }

  autoSave() {
    clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => {
      const key = `oj_code_${this.problem()?.id}_${this.selectedLanguage}`;
      localStorage.setItem(key, this.code);
    }, 1000);
  }

  loadSavedCode(problemId: number) {
    const key = `oj_code_${problemId}_${this.selectedLanguage}`;
    const saved = localStorage.getItem(key);
    if (saved) this.code = saved;
    else this.code = this.getBoilerplate();
  }

  onLanguageChange() {
    const key = `oj_code_${this.problem()?.id}_${this.selectedLanguage}`;
    const saved = localStorage.getItem(key);
    this.code = saved || this.getBoilerplate();
  }

  toggleTheme() { this.darkTheme = !this.darkTheme; }

  formatDescription(desc: string): string {
    return desc
      .replace(/\n/g, '<br>')
      .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  formatResult(result: string): string {
    const map: Record<string, string> = {
      ACCEPTED: '✅ Accepted',
      WRONG_ANSWER: '❌ Wrong Answer',
      TIME_LIMIT_EXCEEDED: '⏰ Time Limit Exceeded',
      RUNTIME_ERROR: '💥 Runtime Error',
      COMPILATION_ERROR: '🔧 Compilation Error',
      PENDING: '⏳ Pending',
    };
    return map[result] || result;
  }

  parseTags(tags: any): string[] {
    if (Array.isArray(tags)) return tags;
    try { return JSON.parse(tags); } catch { return []; }
  }

  private getBoilerplate(): string {
    const boilerplates: Record<string, string> = {
      PYTHON: '# Write your solution here\nimport sys\n\ndef solve():\n    pass\n\nsolve()\n',
      CPP: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}\n',
      JAVA: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // Write your solution here\n    }\n}\n',
      JAVASCRIPT: '// Write your solution here\nconst readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (line) => {\n    console.log(line);\n});\n',
    };
    return boilerplates[this.selectedLanguage] || '';
  }
}

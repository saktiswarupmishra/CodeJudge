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
      <div class="left-panel" [style.width.%]="leftPanelWidth">
        <!-- Tabs -->
        <div class="panel-tabs">
          <button class="panel-tab" [class.active]="activeTab === 'description'" (click)="activeTab = 'description'">📋 Description</button>
          <button class="panel-tab" [class.active]="activeTab === 'editorial'" (click)="activeTab = 'editorial'">💡 Editorial</button>
          <button class="panel-tab" [class.active]="activeTab === 'submissions'" (click)="activeTab = 'submissions'">📊 Submissions</button>
        </div>

        @if (activeTab === 'description') {
          @if (problem()) {
            <div class="problem-info">
              <div class="problem-header">
                <h2>{{ problem()!.id }}. {{ problem()!.title }}</h2>
                <div class="header-actions">
                  <span class="badge" [class]="problem()!.difficulty.toLowerCase()">{{ problem()!.difficulty }}</span>
                  <button class="bookmark-btn" (click)="toggleBookmark()" [class.active]="isBookmarked()" title="Bookmark">
                    {{ isBookmarked() ? '★' : '☆' }}
                  </button>
                </div>
              </div>
              <div class="problem-meta">
                <span class="meta-item">👁 {{ problem()!._count?.submissions || 0 }} submissions</span>
                <span class="meta-item">✅ {{ problem()!.acceptanceRate || 0 }}% acceptance</span>
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
                  @for (tc of problem()!.testCases; track tc.id; let i = $index) {
                    <div class="test-case">
                      <div class="tc-label">Example {{ i + 1 }}</div>
                      <div class="tc-row"><strong>Input:</strong><pre>{{ tc.input }}</pre></div>
                      <div class="tc-row"><strong>Output:</strong><pre>{{ tc.output }}</pre></div>
                    </div>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="loading-skeleton">
              <div class="skel-title"></div>
              <div class="skel-line w80"></div>
              <div class="skel-line w60"></div>
              <div class="skel-line w90"></div>
              <div class="skel-line w70"></div>
              <div class="skel-line w85"></div>
            </div>
          }
        }

        @if (activeTab === 'editorial') {
          <div class="editorial-panel">
            @if (problem()?.editorial) {
              <div class="description" [innerHTML]="formatDescription(problem()!.editorial!)"></div>
            } @else {
              <div class="empty-tab">
                <span class="empty-icon">💡</span>
                <p>No editorial available for this problem yet.</p>
                <p class="hint">Try solving it yourself first!</p>
              </div>
            }
          </div>
        }

        @if (activeTab === 'submissions') {
          <div class="submissions-panel">
            @for (sub of submissions(); track sub.id) {
              <div class="sub-row" [class]="sub.result.toLowerCase().replace('_', '-')" (click)="loadSubmissionCode(sub)">
                <span class="sub-result">{{ formatResult(sub.result) }}</span>
                <span class="sub-lang">{{ sub.language }}</span>
                <span class="sub-time">{{ sub.executionTime ? sub.executionTime + 'ms' : '-' }}</span>
                <span class="sub-mem">{{ sub.memoryUsage ? sub.memoryUsage + 'MB' : '-' }}</span>
                <span class="sub-date">{{ formatDate(sub.createdAt) }}</span>
              </div>
            }
            @if (submissions().length === 0) {
              <div class="empty-tab">
                <span class="empty-icon">📊</span>
                <p>No submissions yet</p>
              </div>
            }
          </div>
        }
      </div>

      <!-- Resize Handle -->
      <div class="resize-handle" (mousedown)="startResize($event)"></div>

      <!-- Right Panel: Code Editor -->
      <div class="right-panel" [style.width.%]="100 - leftPanelWidth">
        <div class="editor-toolbar">
          <select [(ngModel)]="selectedLanguage" class="lang-select" (change)="onLanguageChange()">
            <option value="PYTHON">Python</option>
            <option value="CPP">C++</option>
            <option value="JAVA">Java</option>
            <option value="JAVASCRIPT">JavaScript</option>
          </select>
          <div class="toolbar-actions">
            <select [(ngModel)]="fontSize" class="font-select" (change)="updateFontSize()">
              <option [value]="12">12px</option>
              <option [value]="13">13px</option>
              <option [value]="14">14px</option>
              <option [value]="15">15px</option>
              <option [value]="16">16px</option>
              <option [value]="18">18px</option>
            </select>
            <button class="btn-icon" (click)="resetCode()" title="Reset Code">🔄</button>
            <button class="btn-icon" (click)="toggleTheme()" title="Toggle theme">
              {{ darkTheme ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>

        <div class="code-editor">
          <div class="line-numbers" [style.font-size.px]="fontSize">
            @for (n of lineNumbers(); track n) {
              <span>{{ n }}</span>
            }
          </div>
          <textarea
            [(ngModel)]="code"
            class="code-textarea"
            [class.dark]="darkTheme"
            [style.font-size.px]="fontSize"
            (input)="autoSave(); updateLineNumbers()"
            (keydown)="onKeyDown($event)"
            (scroll)="syncScroll($event)"
            spellcheck="false"
            placeholder="Write your code here..."
            #codeEditor
          ></textarea>
        </div>

        <div class="editor-footer">
          <div class="custom-input-toggle">
            <label class="toggle-label">
              <input type="checkbox" [(ngModel)]="useCustomInput" />
              Custom Input
            </label>
          </div>
          <div class="btn-group">
            <button class="btn-run" (click)="onRun()" [disabled]="running()">
              {{ running() ? '⏳ Running...' : '▶ Run' }}
            </button>
            <button class="btn-submit" (click)="onSubmit()" [disabled]="running()">
              {{ running() ? '⏳ ...' : '🚀 Submit' }}
            </button>
          </div>
        </div>

        <!-- Custom Input -->
        @if (useCustomInput) {
          <div class="custom-input-area">
            <div class="custom-input-header">Custom Test Input</div>
            <textarea
              [(ngModel)]="customInput"
              class="custom-textarea"
              rows="3"
              placeholder="Enter custom input..."
              spellcheck="false"
            ></textarea>
          </div>
        }

        <!-- Output Panel -->
        @if (output()) {
          <div class="output-panel" [class]="outputClass()">
            <div class="output-header">
              <span class="output-status">{{ outputStatus() }}</span>
              <div class="output-meta-group">
                @if (executionTime()) {
                  <span class="output-meta">⏱ {{ executionTime() }}ms</span>
                }
                @if (memoryUsage()) {
                  <span class="output-meta">💾 {{ memoryUsage() }}MB</span>
                }
              </div>
            </div>
            <!-- Individual test case results -->
            @if (testResults().length > 0) {
              <div class="test-results">
                @for (tr of testResults(); track $index) {
                  <div class="test-result-item" [class.passed]="tr.passed" [class.failed]="!tr.passed">
                    <span class="tr-label">Case {{ $index + 1 }}</span>
                    <span class="tr-status">{{ tr.passed ? '✅' : '❌' }}</span>
                  </div>
                }
              </div>
            }
            <pre class="output-content">{{ output() }}</pre>
          </div>
        }

        <!-- Confetti overlay -->
        @if (showConfetti()) {
          <div class="confetti-container">
            @for (i of confettiPieces; track i) {
              <div class="confetti-piece" [style.left.%]="i * 5" [style.animation-delay.ms]="i * 100" [style.background]="confettiColors[i % confettiColors.length]"></div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .editor-page { display: flex; height: calc(100vh - 60px); }

    .left-panel {
      overflow-y: auto; padding: 0;
      border-right: 1px solid var(--border-subtle);
      background: rgba(0, 0, 0, 0.15);
      display: flex; flex-direction: column;
    }

    .resize-handle {
      width: 5px; cursor: col-resize;
      background: transparent;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    .resize-handle:hover { background: var(--accent-primary); }

    .right-panel { display: flex; flex-direction: column; overflow: hidden; position: relative; }

    .panel-tabs {
      display: flex; border-bottom: 1px solid var(--border-subtle);
      background: rgba(0,0,0,0.2); flex-shrink: 0;
    }
    .panel-tab {
      padding: 0.6rem 1rem; border: none; background: transparent;
      color: var(--text-muted); cursor: pointer; font-size: 0.82rem;
      font-weight: 500; transition: all var(--transition-fast);
      border-bottom: 2px solid transparent;
    }
    .panel-tab:hover { color: var(--text-primary); background: rgba(255,255,255,0.03); }
    .panel-tab.active { color: var(--text-primary); border-bottom-color: var(--accent-primary); background: rgba(99,102,241,0.06); }

    .problem-info { padding: 1.5rem; overflow-y: auto; }
    .editorial-panel, .submissions-panel { padding: 1.5rem; overflow-y: auto; flex: 1; }

    .problem-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
    .problem-header h2 { color: var(--text-primary); margin: 0; font-size: 1.35rem; font-weight: 700; flex: 1; }
    .header-actions { display: flex; align-items: center; gap: 0.5rem; }

    .bookmark-btn {
      background: transparent; border: 1px solid var(--border-default);
      color: var(--text-muted); width: 32px; height: 32px;
      border-radius: var(--radius-sm); cursor: pointer;
      font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
      transition: all var(--transition-fast);
    }
    .bookmark-btn:hover { border-color: #fbbf24; color: #fbbf24; }
    .bookmark-btn.active { color: #fbbf24; border-color: #fbbf24; background: rgba(251,191,36,0.1); }

    .problem-meta { display: flex; gap: 1rem; margin-bottom: 0.7rem; }
    .meta-item { color: var(--text-dim); font-size: 0.78rem; }

    .badge { padding: 0.18rem 0.55rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
    .badge.easy { background: var(--green-bg); color: var(--green-light); }
    .badge.medium { background: var(--yellow-bg); color: var(--yellow-light); }
    .badge.hard { background: var(--red-bg); color: var(--red-light); }

    .tags-row { display: flex; gap: 0.4rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
    .tag { background: rgba(99, 102, 241, 0.1); color: #a5b4fc; padding: 0.12rem 0.45rem; border-radius: 3px; font-size: 0.72rem; font-weight: 500; }

    .description { color: var(--text-secondary); line-height: 1.75; font-size: 0.92rem; }

    .section { margin-top: 1.5rem; }
    .section h3 { color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 0.7rem; font-weight: 600; }

    .constraints { background: rgba(0,0,0,0.2); padding: 0.7rem 0.9rem; border-radius: var(--radius-md); color: var(--text-secondary); font-size: 0.82rem; white-space: pre-wrap; border: 1px solid var(--border-subtle); }

    .test-case {
      background: rgba(0,0,0,0.2); border-radius: var(--radius-md);
      padding: 0.7rem 0.9rem; margin-bottom: 0.6rem;
      border: 1px solid var(--border-subtle);
    }
    .tc-label { color: var(--accent-secondary); font-size: 0.75rem; font-weight: 600; margin-bottom: 0.4rem; }
    .tc-row { margin-bottom: 0.35rem; }
    .tc-row strong { color: var(--text-muted); font-size: 0.75rem; display: block; margin-bottom: 0.15rem; }
    .tc-row pre { margin: 0; color: var(--text-primary); font-size: 0.82rem; }

    .empty-tab { text-align: center; padding: 3rem 1rem; }
    .empty-icon { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
    .empty-tab p { color: var(--text-muted); font-size: 0.9rem; margin: 0.3rem 0; }
    .empty-tab .hint { color: var(--text-dim); font-size: 0.82rem; }

    .loading-skeleton { padding: 1.5rem; }
    .skel-title { height: 28px; width: 70%; background: rgba(255,255,255,0.06); border-radius: 6px; margin-bottom: 1rem; animation: shimmer 1.5s infinite; }
    .skel-line { height: 14px; background: rgba(255,255,255,0.04); border-radius: 4px; margin-bottom: 0.6rem; animation: shimmer 1.5s infinite; }
    .w80 { width: 80%; } .w60 { width: 60%; } .w90 { width: 90%; } .w70 { width: 70%; } .w85 { width: 85%; }
    @keyframes shimmer { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }

    /* Submissions Panel */
    .sub-row {
      display: grid; grid-template-columns: 1fr 70px 60px 60px 90px;
      padding: 0.55rem 0.7rem; background: rgba(0,0,0,0.15);
      border-radius: var(--radius-sm); margin-bottom: 0.3rem;
      font-size: 0.82rem; cursor: pointer;
      border: 1px solid transparent;
      transition: all var(--transition-fast);
    }
    .sub-row:hover { border-color: var(--border-default); background: rgba(99,102,241,0.04); }
    .sub-row.accepted .sub-result { color: var(--green-light); }
    .sub-row.wrong-answer .sub-result { color: var(--red-light); }
    .sub-row.time-limit-exceeded .sub-result { color: var(--yellow-light); }
    .sub-row.runtime-error .sub-result { color: #fb923c; }
    .sub-row.pending .sub-result { color: #94a3b8; }
    .sub-lang, .sub-time, .sub-mem { color: var(--text-muted); }
    .sub-date { color: var(--text-dim); font-size: 0.75rem; }

    /* Editor Toolbar */
    .editor-toolbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 0.5rem 1rem; background: rgba(0,0,0,0.3);
      border-bottom: 1px solid var(--border-subtle); flex-shrink: 0;
    }
    .lang-select, .font-select {
      background: var(--bg-surface); border: 1px solid var(--border-default);
      color: var(--text-primary); padding: 0.35rem 0.7rem;
      border-radius: var(--radius-sm); font-size: 0.82rem; cursor: pointer;
    }
    .lang-select option, .font-select option { background: var(--bg-secondary); color: var(--text-primary); }
    .font-select { width: 65px; }
    .toolbar-actions { display: flex; gap: 0.4rem; }
    .btn-icon {
      background: transparent; border: 1px solid var(--border-subtle);
      padding: 0.35rem 0.5rem; border-radius: var(--radius-sm);
      cursor: pointer; font-size: 0.9rem; transition: background var(--transition-fast);
    }
    .btn-icon:hover { background: var(--bg-surface-hover); }

    /* Code Editor */
    .code-editor { flex: 1; overflow: hidden; display: flex; position: relative; }
    .line-numbers {
      width: 40px; padding: 1rem 0.4rem 1rem 0;
      background: #0a0e16; color: rgba(255,255,255,0.2);
      text-align: right; font-family: 'JetBrains Mono', monospace;
      line-height: 1.65; overflow: hidden;
      user-select: none; flex-shrink: 0;
      border-right: 1px solid rgba(255,255,255,0.06);
    }
    .line-numbers span { display: block; }
    .code-textarea {
      flex: 1; padding: 1rem; background: #0d1117; color: #e2e8f0;
      border: none; font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
      line-height: 1.65; resize: none; outline: none; tab-size: 4;
      box-sizing: border-box; width: 100%;
    }
    .code-textarea.dark { background: #080c14; color: #c9d1d9; }
    .code-textarea::placeholder { color: var(--text-dim); }

    /* Editor Footer */
    .editor-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 0.5rem 1rem; background: rgba(0,0,0,0.3);
      border-top: 1px solid var(--border-subtle); flex-shrink: 0;
    }
    .custom-input-toggle { display: flex; align-items: center; }
    .toggle-label {
      display: flex; align-items: center; gap: 0.4rem;
      color: var(--text-muted); font-size: 0.82rem; cursor: pointer;
    }
    .toggle-label input[type="checkbox"] { accent-color: var(--accent-primary); }
    .btn-group { display: flex; gap: 0.4rem; }
    .btn-run {
      padding: 0.45rem 1.1rem; background: var(--bg-surface);
      border: 1px solid var(--border-default); color: var(--text-primary);
      border-radius: var(--radius-sm); cursor: pointer;
      font-size: 0.82rem; font-weight: 500; transition: all var(--transition-fast);
    }
    .btn-run:hover { background: var(--bg-surface-hover); border-color: var(--border-strong); }
    .btn-submit {
      padding: 0.45rem 1.1rem;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border: none; color: #fff; border-radius: var(--radius-sm);
      cursor: pointer; font-size: 0.82rem; font-weight: 600;
      transition: all var(--transition-fast);
    }
    .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3); }
    .btn-run:disabled, .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    /* Custom Input */
    .custom-input-area {
      border-top: 1px solid var(--border-subtle);
      background: rgba(0,0,0,0.2); flex-shrink: 0;
    }
    .custom-input-header { padding: 0.4rem 1rem; color: var(--text-muted); font-size: 0.78rem; font-weight: 600; }
    .custom-textarea {
      width: 100%; padding: 0.5rem 1rem; background: transparent;
      color: var(--text-primary); border: none; font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem; resize: none; outline: none; box-sizing: border-box;
    }

    /* Output Panel */
    .output-panel {
      padding: 0.8rem 1rem; border-top: 1px solid var(--border-subtle);
      max-height: 220px; overflow-y: auto; flex-shrink: 0;
    }
    .output-panel.success { background: rgba(34, 197, 94, 0.06); }
    .output-panel.error { background: rgba(239, 68, 68, 0.06); }
    .output-panel.warning { background: rgba(245, 158, 11, 0.06); }
    .output-panel.pending { background: rgba(148, 163, 184, 0.06); }
    .output-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
    .output-status { font-weight: 700; font-size: 0.88rem; }
    .output-meta-group { display: flex; gap: 0.8rem; }
    .output-meta { color: var(--text-muted); font-size: 0.78rem; }
    .output-content { margin: 0; color: var(--text-secondary); font-size: 0.82rem; white-space: pre-wrap; }

    .test-results { display: flex; gap: 0.3rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
    .test-result-item {
      padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem;
      display: flex; align-items: center; gap: 0.3rem;
    }
    .test-result-item.passed { background: var(--green-bg); color: var(--green-light); }
    .test-result-item.failed { background: var(--red-bg); color: var(--red-light); }
    .tr-label { font-weight: 500; }

    /* Confetti */
    .confetti-container {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none; overflow: hidden; z-index: 50;
    }
    .confetti-piece {
      position: absolute; top: -10px; width: 8px; height: 8px;
      animation: confettiFall 2s ease-in forwards;
    }
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }

    .loading { color: var(--text-muted); padding: 2rem; text-align: center; }
  `]
})
export class ProblemDetailComponent implements OnInit, OnDestroy {
  problem = signal<Problem | null>(null);
  submissions = signal<Submission[]>([]);
  isBookmarked = signal(false);
  code = '';
  selectedLanguage = 'PYTHON';
  darkTheme = true;
  fontSize = 14;
  running = signal(false);
  output = signal('');
  outputStatus = signal('');
  outputClass = signal('');
  executionTime = signal<number | null>(null);
  memoryUsage = signal<number | null>(null);
  testResults = signal<{passed: boolean}[]>([]);
  showConfetti = signal(false);
  activeTab = 'description';
  useCustomInput = false;
  customInput = '';
  leftPanelWidth = 45;
  lineNums = signal<number[]>([1]);

  confettiPieces = Array.from({length: 20}, (_, i) => i);
  confettiColors = ['#22c55e', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6', '#ec4899'];

  private autoSaveTimer: any;
  private pollTimer: any;
  private resizing = false;

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
    this.checkBookmark(id);

    const user = this.authService.user();
    if (user) {
      this.wsService.connect(user.id);
    }

    // Add resize listener
    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.stopResize);
  }

  ngOnDestroy() {
    clearTimeout(this.autoSaveTimer);
    clearInterval(this.pollTimer);
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  }

  loadProblem(id: number) {
    this.problemService.getById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.problem.set(res.data!);
          this.updateLineNumbers();
        }
      },
    });
  }

  loadSubmissions(problemId: number) {
    this.submissionService.getByProblem(problemId).subscribe({
      next: (res) => { if (res.success) this.submissions.set(res.data || []); },
    });
  }

  checkBookmark(problemId: number) {
    this.problemService.isBookmarked(problemId).subscribe({
      next: (res) => { if (res.success) this.isBookmarked.set(res.data?.bookmarked || false); },
      error: () => {},
    });
  }

  toggleBookmark() {
    if (!this.problem()) return;
    this.problemService.toggleBookmark(this.problem()!.id).subscribe({
      next: (res) => { if (res.success) this.isBookmarked.set(res.data?.bookmarked || false); },
    });
  }

  loadSubmissionCode(sub: Submission) {
    this.code = sub.code;
    this.selectedLanguage = sub.language;
    this.activeTab = 'description';
    this.updateLineNumbers();
  }

  // ─── Resize Logic ──────────────────────────
  startResize(e: MouseEvent) {
    this.resizing = true;
    e.preventDefault();
  }

  onResize = (e: MouseEvent) => {
    if (!this.resizing) return;
    const pct = (e.clientX / window.innerWidth) * 100;
    this.leftPanelWidth = Math.max(25, Math.min(70, pct));
  };

  stopResize = () => { this.resizing = false; };

  // ─── Line Numbers ──────────────────────────
  lineNumbers(): number[] {
    return this.lineNums();
  }

  updateLineNumbers() {
    const lines = (this.code || '').split('\n').length;
    this.lineNums.set(Array.from({length: Math.max(lines, 20)}, (_, i) => i + 1));
  }

  syncScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const lineNumbersEl = textarea.parentElement?.querySelector('.line-numbers') as HTMLElement;
    if (lineNumbersEl) {
      lineNumbersEl.scrollTop = textarea.scrollTop;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      this.code = this.code.substring(0, start) + '    ' + this.code.substring(end);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  }

  updateFontSize() { /* fontSize is bound via ngModel */ }

  resetCode() {
    if (confirm('Reset code to default template?')) {
      this.code = this.getBoilerplate();
      this.updateLineNumbers();
    }
  }

  onRun() {
    this.running.set(true);
    this.output.set('Running...');
    this.outputStatus.set('⏳ Running');
    this.outputClass.set('pending');
    this.executionTime.set(null);
    this.memoryUsage.set(null);
    this.testResults.set([]);

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
    this.memoryUsage.set(null);
    this.testResults.set([]);

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
    this.memoryUsage.set(data.memoryUsage);
    this.outputStatus.set(this.formatResult(data.result));

    switch (data.result) {
      case 'ACCEPTED':
        this.outputClass.set('success');
        this.triggerConfetti();
        break;
      case 'WRONG_ANSWER': this.outputClass.set('error'); break;
      case 'TIME_LIMIT_EXCEEDED': this.outputClass.set('warning'); break;
      default: this.outputClass.set('error');
    }

    if (this.problem()) {
      this.loadSubmissions(this.problem()!.id);
    }
  }

  triggerConfetti() {
    this.showConfetti.set(true);
    setTimeout(() => this.showConfetti.set(false), 2500);
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
    this.updateLineNumbers();
  }

  onLanguageChange() {
    const key = `oj_code_${this.problem()?.id}_${this.selectedLanguage}`;
    const saved = localStorage.getItem(key);
    this.code = saved || this.getBoilerplate();
    this.updateLineNumbers();
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

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

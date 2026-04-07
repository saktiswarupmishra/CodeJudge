import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Submission } from '../models';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private ws: WebSocket | null = null;
  readonly lastUpdate = signal<any>(null);

  connect(userId: number): void {
    if (this.ws) this.disconnect();

    this.ws = new WebSocket(environment.wsUrl);

    this.ws.onopen = () => {
      this.ws?.send(JSON.stringify({ type: 'subscribe', userId }));
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'submission_update') {
          this.lastUpdate.set(data.data);
        }
      } catch (e) {}
    };

    this.ws.onerror = () => {};
    this.ws.onclose = () => {
      // Auto-reconnect after 3 seconds
      setTimeout(() => this.connect(userId), 3000);
    };
  }

  disconnect(): void {
    this.ws?.close();
    this.ws = null;
  }
}

/**
 * WebSocket Manager
 * Manages WebSocket connections for real-time submission updates
 */
import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';

class WebSocketManager {
  private wss: WebSocketServer | null = null;
  private clients: Map<number, Set<WebSocket>> = new Map();

  /**
   * Initialize WebSocket server
   */
  init(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('🔌 WebSocket client connected');

      ws.on('message', (data: Buffer) => {
        try {
          const msg = JSON.parse(data.toString());
          if (msg.type === 'subscribe' && msg.userId) {
            this.subscribe(msg.userId, ws);
          }
        } catch (e) {
          // Ignore invalid messages
        }
      });

      ws.on('close', () => {
        // Remove from all subscriptions
        for (const [userId, clients] of this.clients.entries()) {
          clients.delete(ws);
          if (clients.size === 0) {
            this.clients.delete(userId);
          }
        }
      });

      ws.on('error', () => {
        // Silently handle errors
      });
    });

    console.log('✅ WebSocket server initialized');
  }

  /**
   * Subscribe a client to receive updates for a user
   */
  private subscribe(userId: number, ws: WebSocket) {
    if (!this.clients.has(userId)) {
      this.clients.set(userId, new Set());
    }
    this.clients.get(userId)!.add(ws);
  }

  /**
   * Send submission update to subscribed clients
   */
  notifySubmissionUpdate(userId: number, data: any) {
    const clients = this.clients.get(userId);
    if (!clients) return;

    const message = JSON.stringify({
      type: 'submission_update',
      data,
    });

    for (const ws of clients) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    }
  }

  /**
   * Broadcast to all connected clients
   */
  broadcast(data: any) {
    if (!this.wss) return;

    const message = JSON.stringify(data);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export const wsManager = new WebSocketManager();

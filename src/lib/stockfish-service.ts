import { STOCKFISH_CONFIG, STOCKFISH_PATHS } from './stockfish-config';

export class StockfishService {
  private worker: Worker | null = null;
  private isReady = false;
  private messageQueue: string[] = [];
  private currentCallback: ((data: string) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeWorker();
    }
  }

  private async initializeWorker() {
    try {
      const response = await fetch(STOCKFISH_PATHS.WORKER);
      if (!response.ok) {
        throw new Error(`Stockfish worker no encontrado: ${response.statusText}`);
      }

      this.worker = new Worker(STOCKFISH_PATHS.WORKER, { type: 'module' });
      
      if (!this.worker) {
        throw new Error('No se pudo crear el worker de Stockfish');
      }

      this.worker.onmessage = this.handleMessage.bind(this);
      this.worker.onerror = this.handleError.bind(this);
      this.init();
    } catch (error) {
      console.error('Error al inicializar Stockfish:', error instanceof Error ? error.message : 'Error desconocido');
    }
  }

  private init() {
    this.sendCommand('uci');
    this.sendCommand(`setoption name Threads value ${STOCKFISH_CONFIG.DEFAULT_THREADS}`);
    this.sendCommand(`setoption name Hash value ${STOCKFISH_CONFIG.HASH_SIZE}`);
    this.sendCommand(`setoption name MultiPV value ${STOCKFISH_CONFIG.MULTI_PV}`);
    this.sendCommand('isready');
  }

  private handleMessage(event: MessageEvent<string>) {
    const message = event.data;
    
    if (message === 'uciok' || message === 'readyok') {
      this.isReady = true;
      this.processQueue();
    } else if (this.currentCallback) {
      this.currentCallback(message);
    }
  }

  private handleError(error: ErrorEvent) {
    console.error('Error en el worker de Stockfish:', {
      message: error.message,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno
    });
  }

  private processQueue() {
    while (this.messageQueue.length > 0) {
      const command = this.messageQueue.shift();
      if (command) this.sendCommand(command);
    }
  }

  public sendCommand(command: string) {
    if (!this.worker) return;

    if (!this.isReady && command !== 'uci') {
      this.messageQueue.push(command);
      return;
    }

    this.worker.postMessage(command);
  }

  public async getAnalysis(fen: string, depth: number = 15): Promise<string> {
    return new Promise((resolve) => {
      let bestMove = '';
      let evaluation = '';
      const lines: string[] = [];

      this.currentCallback = (data: string) => {
        if (data.includes('info depth')) {
          const scoreMatch = data.match(/score cp (-?\d+)/);
          const mateMatch = data.match(/score mate (-?\d+)/);
          
          if (scoreMatch) {
            const score = parseInt(scoreMatch[1]) / 100;
            evaluation = score > 0 ? `+${score}` : `${score}`;
          } else if (mateMatch) {
            evaluation = `Mate en ${mateMatch[1]}`;
          }

          const pvMatch = data.match(/pv (.+?)(?= info|$)/);
          if (pvMatch) {
            lines.push(pvMatch[1]);
          }
        }

        if (data.startsWith('bestmove')) {
          bestMove = data.split(' ')[1];
          resolve(`Evaluación: ${evaluation}\nMejor jugada: ${bestMove}\nLíneas principales:\n${lines.join('\n')}`);
          this.currentCallback = null;
        }
      };

      this.sendCommand('position fen ' + fen);
      this.sendCommand('go depth ' + depth);
    });
  }

  public destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export const stockfish = new StockfishService(); 
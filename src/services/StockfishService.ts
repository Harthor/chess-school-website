import { STOCKFISH_CONFIG, STOCKFISH_PATHS } from '@/lib/stockfish-config';

export interface AnalysisResult {
  evaluation: number;
  bestMove: string;
  depth: number;
  pv?: string[];
  isMate?: boolean;
}

class StockfishService {
  private worker: Worker | null = null;
  private isReady = false;
  private onAnalysisCallback: ((result: AnalysisResult) => void) | null = null;

  initialize() {
    if (typeof window === 'undefined') return;

    this.worker = new Worker(STOCKFISH_PATHS.WORKER);
    this.worker.onmessage = this.handleMessage.bind(this);
    
    this.worker.postMessage('uci');
    this.worker.postMessage(`setoption name Threads value ${STOCKFISH_CONFIG.DEFAULT_THREADS}`);
    this.worker.postMessage(`setoption name Hash value ${STOCKFISH_CONFIG.HASH_SIZE}`);
    this.worker.postMessage(`setoption name MultiPV value ${STOCKFISH_CONFIG.MULTI_PV}`);
    this.worker.postMessage(`setoption name Skill Level value ${STOCKFISH_CONFIG.SKILL_LEVEL}`);
    this.worker.postMessage('setoption name Use NNUE value true');
    this.worker.postMessage('isready');
  }

  private handleMessage(event: MessageEvent) {
    const message = event.data;

    if (message === 'readyok') {
      this.isReady = true;
    }

    if (message.includes('info depth')) {
      const depth = parseInt(message.match(/depth (\d+)/)?.[1] || '0');
      let evaluation = 0;
      let isMate = false;

      if (message.includes('score cp')) {
        evaluation = parseInt(message.split('score cp ')[1]) / 100;
      } else if (message.includes('score mate')) {
        evaluation = parseInt(message.split('score mate ')[1]);
        isMate = true;
      }

      const pv = message.split('pv ')[1]?.split(' ');
      
      if (this.onAnalysisCallback && depth >= 10) {
        this.onAnalysisCallback({
          evaluation,
          bestMove: pv?.[0] || '',
          depth,
          pv,
          isMate
        });
      }
    }
  }

  analyzePosition(fen: string, callback: (result: AnalysisResult) => void) {
    if (!this.worker || !this.isReady) return;

    this.onAnalysisCallback = callback;
    this.worker.postMessage('stop');
    this.worker.postMessage(`position fen ${fen}`);
    this.worker.postMessage(`go depth ${STOCKFISH_CONFIG.DEFAULT_DEPTH} movetime ${STOCKFISH_CONFIG.MINIMUM_THINKING_TIME}`);
  }

  stop() {
    this.worker?.postMessage('stop');
  }

  destroy() {
    this.worker?.terminate();
    this.worker = null;
    this.isReady = false;
  }
}

export const stockfishService = new StockfishService(); 
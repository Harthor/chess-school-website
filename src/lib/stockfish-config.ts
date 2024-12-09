export const STOCKFISH_CONFIG = {
  DEFAULT_DEPTH: 15,
  DEFAULT_THREADS: 1,
  HASH_SIZE: 16,
  MULTI_PV: 3,
  SKILL_LEVEL: 20,
  MINIMUM_THINKING_TIME: 1000
};

export const STOCKFISH_PATHS = {
  WORKER: '/stockfish/stockfish.js',
  WASM: '/stockfish/stockfish.wasm'
};

// Asegúrate de que el worker tenga acceso al archivo WASM
export const STOCKFISH_INIT = {
  wasmMemory: new WebAssembly.Memory({ initial: 32, maximum: 512 }),
  locateFile: (path: string) => {
    if (path.endsWith('.wasm')) {
      return STOCKFISH_PATHS.WASM;
    }
    return path;
  }
}; 
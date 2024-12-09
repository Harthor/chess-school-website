'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { stockfishService, AnalysisResult } from '@/services/StockfishService';

const games = [
  {
    id: 1,
    name: 'Karpov vs Needleman - Simultáneas Buenos Aires (2005)',
    result: '0-1',
    moves: [
      'Nf3', 'Nf6',    // 1
      'c4', 'g6',      // 2
      'g3', 'Bg7',     // 3
      'Bg2', 'O-O',    // 4
      'O-O', 'd6',     // 5
      'd4', 'c6',      // 6
      'Nc3', 'Qa5',    // 7
      'e4', 'e5',      // 8
      'h3', 'Nbd7',    // 9
      'Re1', 'exd4',   // 10
      'Nxd4', 'Ne5',   // 11
      'Bf1', 'Be6',    // 12
      'Nxe6', 'fxe6',  // 13
      'Kg2', 'Rad8',   // 14
      'Qa4', 'Qb6',    // 15
      'f4', 'Nf7',     // 16
      'Qb3', 'Qc7',    // 17
      'Be3', 'b6',     // 18
      'Rad1', 'Kh8',   // 19
      'Be2', 'e5',     // 20
      'f5', 'gxf5',    // 21
      'exf5', 'Rg8',   // 22
      'Bf3', 'Bh6',    // 23
      'Ne4', 'Qe7',    // 24
      'Bf2', 'Rg7',    // 25
      'Kh2', 'Rdg8',   // 26
      'Nxf6', 'Qxf6',  // 27
      'Bxc6', 'Qxf5',  // 28
      'Qf3', 'Qc8',    // 29
      'Bd5', 'Ng5',    // 30
      'Qh5', 'Rf8',    // 31
      'Be3', 'Rg6',    // 32
      'Rf1', 'Rf5',    // 33
      'Rxf5', 'Qxf5',  // 34
      'Kg2', 'Rf6',    // 35
      'Qg4', 'Qxg4',   // 36
      'hxg4', 'Kg7',   // 37
      'Bf2', 'Ne6',    // 38
      'b4', 'Nd4',     // 39
      'Bxd4', 'exd4',  // 40
      'Rxd4', 'a5',    // 41
      'bxa5', 'bxa5',  // 42
      'Re4', 'Kf8',    // 43
      'Bc6', 'Bd2',    // 44
      'Re8+', 'Kf7',   // 45
      'Re2', 'Bc1',    // 46
      'Be4', 'h6',     // 47
      'Bf5', 'Kg7',    // 48
      'Kf3', 'Ba3',    // 49
      'Ke4', 'Bc5',    // 50
      'Kd5', 'a4',     // 51
      'Ke4', 'a3',     // 52
      'Kf4', 'Bd4',    // 53
      'g5', 'Be5+',    // 54
      'Kg4', 'h5+',    // 55
      'Kxh5', 'Rxf5',  // 56
      'Kg4', 'Kg6',    // 57
      'Re3', 'Rxg5+',  // 58
      'Kh3', 'Bb2',    // 59
      'Re6+', 'Kf7',   // 60
      'Rxd6', 'Rc5',   // 61
      'Kg4', 'Rxc4+',  // 62
      'Kf5', 'Ke7',    // 63
      'Re6+', 'Kf7',   // 64
      'Ra6', 'Rc2',    // 65
      'Ra7+', 'Kf8',   // 66
      'g4', 'Bc1',     // 67
      'g5', 'Rxa2',    // 68
      'g6', 'Rf2+',    // 69
      'Ke5', 'Bb2+',   // 70
      'Kd5', 'Rg2',    // 71
      'Kc4', 'Rxg6',   // 72
      'Kb3', 'Re6',    // 73
      'Ka2', 'Re7',    // 74
      'Ra6', 'Rb7',    // 75
      'Ra4', 'Ke7',    // 76
      'Ra6', 'Kd7',    // 77
      'Rh6', 'Kc7',    // 78
      'Rg6', 'Rb6',    // 79
      'Rg5', 'Kc6',    // 80
      'Rg6+', 'Kb5',   // 81
      'Rg5+', 'Ka4',   // 82
      'Rg4+', 'Rb4',   // 83
      'Rg8', 'Rc4',    // 84
      'Ra8+', 'Kb4',   // 85
      'Rb8+', 'Kc3',   // 86
      'Ra8', 'Kc2',    // 87
      'Rc8', 'Kd3',    // 88
      'Rd8+', 'Kc3',   // 89
      'Rg8', 'Rc5',    // 90
      'Ra8', 'Kb4',    // 91
      'Rb8+', 'Rb5',   // 92
      'Rg8', 'Bd4',    // 93
      'Rg3', 'Kc4',    // 94
      'Rxa3', 'Rb2+',  // 95
      'Ka1', 'Kd5'     // 96
    ]
  }
];

export default function ChessBoard() {
  const [gameIndex, setGameIndex] = useState(0);
  const [moveIndex, setMoveIndex] = useState(0);
  const [game, setGame] = useState(new Chess());
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [boardWidth, setBoardWidth] = useState(400);

  const currentGame = games[gameIndex];

  useEffect(() => {
    const getBoardWidth = () => {
      if (typeof window === 'undefined') return 400;
      if (window.innerWidth < 640) return Math.min(window.innerWidth - 32, 300);
      if (window.innerWidth < 1024) return 400;
      return 480;
    };

    const handleResize = () => setBoardWidth(getBoardWidth());
    setBoardWidth(getBoardWidth());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    stockfishService.initialize();
    return () => stockfishService.destroy();
  }, []);

  const analyzePosition = (fen: string) => {
    stockfishService.analyzePosition(fen, (result) => {
      setAnalysis(result);
    });
  };

  const goToMove = (index: number) => {
    const newGame = new Chess();
    for (let i = 0; i <= index && i < currentGame.moves.length; i++) {
      newGame.move(currentGame.moves[i]);
    }
    setGame(newGame);
    setMoveIndex(index);
    analyzePosition(newGame.fen());
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">{currentGame.name}</h2>
          <div className="flex justify-center">
            <Chessboard
              position={game.fen()}
              boardWidth={boardWidth}
            />
          </div>
          <div className="mt-4 flex gap-4 items-center justify-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => moveIndex > 0 && goToMove(moveIndex - 1)}
            >
              ←
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => moveIndex < currentGame.moves.length - 1 && goToMove(moveIndex + 1)}
            >
              →
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-72 bg-gray-800 p-4 rounded-lg text-white">
          <h3 className="font-bold mb-4 text-lg border-b border-gray-600 pb-2">Análisis Stockfish</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Evaluación</h4>
              <div className="h-2 bg-gray-600 rounded">
                <div 
                  className="h-full bg-blue-500 rounded transition-all duration-300" 
                  style={{
                    width: `${Math.min(Math.max((analysis?.evaluation || 0) + 2) * 25, 0), 100}%`
                  }}
                />
              </div>
              <p className="text-sm mt-1">
                {analysis?.isMate 
                  ? `Mate en ${Math.abs(analysis.evaluation)}`
                  : `${analysis?.evaluation > 0 ? '+' : ''}${analysis?.evaluation?.toFixed(2) || '0.00'}`}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Mejor jugada</h4>
              <div className="bg-gray-700 p-2 rounded text-sm">
                {analysis?.bestMove || 'Analizando...'}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Profundidad</h4>
              <div className="text-sm">{analysis?.depth || 0}</div>
            </div>

            {analysis?.pv && (
              <div>
                <h4 className="font-semibold mb-2">Variante principal</h4>
                <div className="bg-gray-700 p-2 rounded text-sm">
                  {analysis.pv.slice(0, 5).join(' ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 w-full bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-4 text-lg">Partidas Disponibles</h3>
        <div className="grid gap-2">
          {games.map((g, idx) => (
            <button
              key={g.id}
              className={`p-3 text-left rounded-lg transition-colors ${
                idx === gameIndex 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white hover:bg-gray-50 shadow-sm'
              }`}
              onClick={() => {
                setGameIndex(idx);
                setMoveIndex(0);
                setGame(new Chess());
              }}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


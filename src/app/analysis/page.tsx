'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { stockfish } from '@/lib/stockfish-service';

export default function AnalysisPage() {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;
      
      setFen(game.fen());
      analyzePosition(game.fen());
      return true;
    } catch {
      return false;
    }
  };

  const analyzePosition = async (position: string) => {
    setIsAnalyzing(true);
    try {
      const result = await stockfish.getAnalysis(position);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing position:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      stockfish.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Análisis de Posición</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex justify-center">
          <Chessboard 
            position={fen}
            onPieceDrop={onDrop}
            boardWidth={480}
            customDarkSquareStyle={{ backgroundColor: '#4a5568' }}
            customLightSquareStyle={{ backgroundColor: '#718096' }}
          />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Análisis del Motor</h2>
          
          {isAnalyzing ? (
            <div className="flex items-center text-gray-400">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Analizando posición...
            </div>
          ) : (
            <div className="text-gray-300">
              {analysis || 'Mueve una pieza para comenzar el análisis'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
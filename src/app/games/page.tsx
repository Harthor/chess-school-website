'use client';

import ChessBoard from '@/components/chess/Chessboard';

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Partidas Históricas</h1>
      <ChessBoard />
    </div>
  );
} 
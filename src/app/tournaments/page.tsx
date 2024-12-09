'use client';

import { useState } from 'react';

type Tournament = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  players: string[];
  status: 'ongoing' | 'upcoming';
  type: string;
  score?: string;
  currentGame?: string;
  lastResult?: string;
};

export default function TournamentsPage() {
  const tournaments = useState<Tournament[]>([
    {
      id: '1',
      name: 'Campeonato Mundial de Ajedrez 2024',
      location: 'Toronto, Canadá',
      startDate: '2024-04-02',
      endDate: '2024-04-22',
      players: ['Ding Liren (CHN)', 'D. Gukesh (IND)'],
      status: 'ongoing',
      type: 'Campeonato Mundial',
      score: '2.5 - 3.5',
      currentGame: 'Partida 6 de 12',
      lastResult: 'Victoria de Gukesh con negras'
    }
  ])[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Torneos</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">En Curso</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {tournaments
            .filter(t => t.status === 'ongoing')
            .map(tournament => (
              <div key={tournament.id} className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{tournament.name}</h3>
                  <span className="bg-green-900 text-green-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    En curso
                  </span>
                </div>
                <p className="text-gray-400 mb-2">{tournament.location}</p>
                <p className="text-sm mb-4 text-gray-500">
                  {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </p>
                {tournament.score && (
                  <div className="mb-4 bg-gray-700 p-3 rounded">
                    <h4 className="font-semibold text-gray-200 mb-2">Marcador actual:</h4>
                    <p className="text-xl font-bold text-gray-100">{tournament.score}</p>
                    <p className="text-sm text-gray-400 mt-1">{tournament.currentGame}</p>
                    <p className="text-sm text-green-400 mt-2">{tournament.lastResult}</p>
                  </div>
                )}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-200">Participantes:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    {tournament.players.map((player, idx) => (
                      <li key={idx}>{player}</li>
                    ))}
                  </ul>
                </div>
                <span className="text-sm text-blue-400">{tournament.type}</span>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Próximos</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {tournaments
            .filter(t => t.status === 'upcoming')
            .map(tournament => (
              <div key={tournament.id} className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{tournament.name}</h3>
                  <span className="bg-purple-900 text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    Próximo
                  </span>
                </div>
                <p className="text-gray-400 mb-2">{tournament.location}</p>
                <p className="text-sm mb-4 text-gray-500">
                  {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-gray-200">Jugadores confirmados:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    {tournament.players.map((player, idx) => (
                      <li key={idx}>{player}</li>
                    ))}
                  </ul>
                </div>
                <span className="text-sm text-purple-400">{tournament.type}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 
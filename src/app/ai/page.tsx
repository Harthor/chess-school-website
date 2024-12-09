'use client';

import { useState } from 'react';

interface PlayerProgress {
  id: string;
  name: string;
  country: string;
  currentElo: number;
  eloGain: number;
  previousElo: number;
  age: number;
  title: string;
  recentAchievements: string[];
}

export default function AIPage() {
  const [players] = useState<PlayerProgress[]>([
    {
      id: '1',
      name: 'D. Gukesh',
      country: 'India',
      currentElo: 2758,
      eloGain: 89,
      previousElo: 2669,
      age: 17,
      title: 'GM',
      recentAchievements: [
        'Ganador del Torneo de Candidatos 2024',
        'Top 10 mundial con 17 años',
        'Mayor progresión en 2023'
      ]
    },
    {
      id: '2',
      name: 'Rameshbabu Praggnanandhaa',
      country: 'India',
      currentElo: 2747,
      eloGain: 75,
      previousElo: 2672,
      age: 18,
      title: 'GM',
      recentAchievements: [
        'Finalista Copa Mundial 2023',
        'Victoria sobre Magnus Carlsen en torneos online',
        'Clasificado para el Torneo de Candidatos 2024'
      ]
    },
    {
      id: '3',
      name: 'Alireza Firouzja',
      country: 'Francia',
      currentElo: 2759,
      eloGain: 62,
      previousElo: 2697,
      age: 20,
      title: 'GM',
      recentAchievements: [
        'Más joven en alcanzar 2800 de ELO',
        'Campeón de Francia 2023',
        'Clasificado para el Torneo de Candidatos 2024'
      ]
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Análisis de IA - Progresión de Jugadores</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Mayor Progresión ELO</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map(player => (
            <div key={player.id} className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{player.title} {player.name}</h3>
                  <p className="text-gray-400">{player.country}</p>
                </div>
                <span className="text-sm bg-blue-900 text-blue-200 px-2 py-1 rounded">
                  {player.age} años
                </span>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1 text-gray-300">
                  <span>ELO anterior: {player.previousElo}</span>
                  <span className="text-green-400">+{player.eloGain}</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${((player.currentElo - 2600) / 300) * 100}%`
                    }}
                  />
                </div>
                <div className="text-right text-sm mt-1 text-gray-300">
                  <span className="font-bold">ELO actual: {player.currentElo}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-200">Logros Recientes:</h4>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  {player.recentAchievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Análisis de IA</h2>
        <p className="text-gray-700 mb-4">
          El análisis muestra una tendencia clara en el ajedrez moderno: los jugadores j��venes están 
          progresando más rápido que nunca, en parte gracias al entrenamiento con IA y el acceso a 
          recursos en línea.
        </p>
        <p className="text-gray-700">
          La nueva generación de jugadores, especialmente de India, está mostrando un progreso 
          excepcional, con varios jugadores menores de 20 años alcanzando el top 20 mundial.
        </p>
      </div>
    </div>
  );
} 
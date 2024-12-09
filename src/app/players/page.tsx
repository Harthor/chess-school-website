export default function PlayersPage() {
  const players = [
    {
      id: 1,
      name: 'Magnus Carlsen',
      title: 'GM',
      country: 'Noruega',
      elo: 2830,
      achievements: 'Campeón Mundial 2013-2022, Récord histórico de ELO (2882)',
      image: '/players/carlsen.jpg'
    },
    {
      id: 2,
      name: 'Ding Liren',
      title: 'GM',
      country: 'China',
      elo: 2780,
      achievements: 'Campeón Mundial 2023-presente, Primer campeón mundial chino',
      image: '/players/ding.jpg'
    },
    {
      id: 3,
      name: 'Alireza Firouzja',
      title: 'GM',
      country: 'Francia',
      elo: 2759,
      achievements: 'Más joven en alcanzar 2800 de ELO, Campeón de Francia',
      image: '/players/firouzja.jpg'
    },
    {
      id: 4,
      name: 'D. Gukesh',
      title: 'GM',
      country: 'India',
      elo: 2758,
      achievements: 'Ganador del Torneo de Candidatos 2024, Top 10 mundial con 17 años',
      image: '/players/gukesh.jpg'
    },
    {
      id: 5,
      name: 'Fabiano Caruana',
      title: 'GM',
      country: 'Estados Unidos',
      elo: 2786,
      achievements: 'Retador al título mundial 2018, Ganador de la Copa Sinquefield 2023',
      image: '/players/caruana.jpg'
    },
    {
      id: 6,
      name: 'Hikaru Nakamura',
      title: 'GM',
      country: 'Estados Unidos',
      elo: 2768,
      achievements: 'Campeón Mundial de Blitz 2023, Streamer más popular de ajedrez',
      image: '/players/nakamura.jpg'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Jugadores Destacados</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => (
          <div key={player.id} className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-100">
                  {player.title} {player.name}
                </h2>
                <p className="text-gray-400">{player.country}</p>
              </div>
              <span className="text-sm bg-blue-900 text-blue-200 px-2.5 py-0.5 rounded">
                {player.elo}
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Logros Destacados:</h3>
              <p className="text-gray-400 text-sm">
                {player.achievements}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Élite Mundial</h2>
        <p className="text-gray-300 mb-4">
          El ajedrez de élite actual está dominado por una mezcla de jugadores experimentados y jóvenes talentos.
          La nueva generación, especialmente de India y Uzbekistán, está desafiando a los jugadores establecidos.
        </p>
        <p className="text-gray-300">
          Magnus Carlsen sigue siendo el jugador más fuerte a pesar de haber renunciado al título mundial,
          mientras que Ding Liren mantiene el título de Campeón Mundial FIDE.
        </p>
      </div>
    </div>
  );
} 
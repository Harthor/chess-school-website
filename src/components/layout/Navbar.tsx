'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-300' : 'hover:text-gray-300';
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Chess Analysis
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/games" 
              className={`transition-colors ${isActive('/games')}`}
            >
              Partidas
            </Link>
            <Link 
              href="/analysis" 
              className={`transition-colors ${isActive('/analysis')}`}
            >
              Análisis
            </Link>
            <Link 
              href="/tournaments" 
              className={`transition-colors ${isActive('/tournaments')}`}
            >
              Torneos
            </Link>
            <Link 
              href="/players" 
              className={`transition-colors ${isActive('/players')}`}
            >
              Jugadores
            </Link>
            <Link 
              href="/ai" 
              className={`transition-colors ${isActive('/ai')}`}
            >
              IA
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/app/page.tsx
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-100">Bienvenido a Chess Analysis</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Partidas Históricas</h2>
          <p className="text-gray-400 mb-4">
            Explora partidas famosas y aprende de los grandes maestros.
          </p>
          <Link href="/games" className="text-blue-400 hover:text-blue-500">
            Ver partidas →
          </Link>
        </div>
      </div>
    </div>
  );
}

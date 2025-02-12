import React from 'react';
import Logo from '../home/Logo';
import PaginaBusqueda from './PaginaBusqueda';
import YouTubePlayer from '../NotasMusicales/YouTubePlayer';

const BarraLinks = () => {
  return (
    <div className="min-h-screen bg-purple-900 flex flex-col">
      {/* Encabezado con el logo */}
      <header className="container mx-auto px-4 py-6">
        <Logo />
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-8">
        {/* Componente de búsqueda */}
        <PaginaBusqueda />

        {/* Reproductor de YouTube */}
        <YouTubePlayer />
      </main>
    </div>
  );
};

export default BarraLinks;
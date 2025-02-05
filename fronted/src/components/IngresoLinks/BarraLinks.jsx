import { useState } from 'react';
import Logo from '../home/Logo';
import PaginaBusqueda from './PaginaBusqueda';

const BarraLinks = () => {
  
  return (
    <div className="min-h-screen relative flex flex-col">
      
      <div className="container mx-auto px-4 py-6 relative">
        <Logo />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative text-center px-4">
        <PaginaBusqueda />

      </div>
    </div>

  );
};

export default BarraLinks;

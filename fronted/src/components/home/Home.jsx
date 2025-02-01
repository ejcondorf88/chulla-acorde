import React from 'react';

import { Github, Target } from 'lucide-react';
import Fondo from './Fondo';
import Logo from './Logo';
import Botones from './Botones';
import { Link, useNavigate, useNavigation } from 'react-router-dom';


export const Home = () => {
    const navigate = useNavigate();
    const prueba = () => {window.open("https://github.com/ejcondorf88/chulla-acorde", '_blank' );}
    const pagLink = () => {navigate('BarraLinks');}

  return (
    <div className="min-h-screen bg-purple-900 relative flex flex-col">
      <Fondo />
      
      <div className="container mx-auto px-4 py-6 relative">
        <Logo />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Obten los acordes de tu cancion favorita a travez de un link de YouTube
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl">
          Recrea tus canciones favoritas a traves de los acordes precisos de tus canciones favoritos ayudado por IA y de forma gratuita.
          Proyecto disponible en nuestro repositorio GitHub
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <Botones onClick={prueba} >
            <div className="flex items-center gap-2">
              <Github size={20} />
              GitHub
            </div>
          </Botones>
          <Botones variant="secondary" onClick={pagLink}>
            Ingresar Link
          </Botones>
        </div>
      </div>
    </div>
  );
};



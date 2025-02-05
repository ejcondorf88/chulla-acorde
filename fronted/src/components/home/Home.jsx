import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export const Home = () => {
  const navigate = useNavigate();

  const redirectToGitHub = () => {
    window.open('https://github.com/ejcondorf88/chulla-acorde', '_blank');
  };

  const goToApp = () => {
    navigate('app');
  };

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center p-4">
      {/* Contenedor principal */}
      <Card className="w-full max-w-3xl bg-transparent border-none shadow-none text-center">
        <div className="flex flex-col items-center justify-center">
          <Logo />
          

          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Obten los acordes de tu canción favorita a través de un link de YouTube
          </h1>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-200 mb-12 px-4">
            Recrea tus canciones favoritas a través de los acordes precisos de tus canciones favoritas ayudado por IA y de forma gratuita.
            Proyecto disponible en nuestro repositorio de GitHub.
          </p>

          {/* Botones */}
          <div className="flex gap-4 flex-wrap justify-center">
            {/* Botón para abrir GitHub */}
            <Button
              label="Ver en GitHub"
              icon="pi pi-github"
              className="p-button-rounded p-button-secondary p-button-outlined bg-purple-600 hover:bg-purple-700 text-slate-900"
              onClick={redirectToGitHub}
            />

            {/* Botón para ir a la aplicación */}
            <Button
              label="Ir a la App"
              icon="pi pi-arrow-right"
              className="p-button-rounded p-button-success p-button-outlined bg-purple-600 hover:bg-purple-700 text-slate-900"
              onClick={goToApp}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
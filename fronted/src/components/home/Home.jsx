import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export const Home = () => {
  const navigate = useNavigate();

  // Constantes para URLs y textos
  const GITHUB_URL = 'https://github.com/ejcondorf88/chulla-acorde';
  const APP_TITLE = 'Obten los acordes de tu canción favorita a través de un link de YouTube';
  const APP_DESCRIPTION = 'Recrea tus canciones favoritas a través de los acordes precisos de tus canciones favoritas ayudado por IA y de forma gratuita. Proyecto disponible en nuestro repositorio de GitHub.';

  // Funciones de redirección
  const redirectToGitHub = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  const goToApp = () => {
    navigate('app');
  };

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center p-4">
      {/* Contenedor principal */}
      <Card className="w-full max-w-3xl bg-transparent border-none shadow-none text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <Logo />

          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {APP_TITLE}
          </h1>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-200 px-4">
            {APP_DESCRIPTION}
          </p>

          {/* Botones */}
          <div className="flex gap-4 flex-wrap justify-center">
            {/* Botón para abrir GitHub */}
            <Button
              label="Ver en GitHub"
              icon="pi pi-github"
              className="p-button-rounded p-button-secondary bg-purple-600 hover:bg-purple-700 text-white border-none transition-colors duration-300"
              onClick={redirectToGitHub}
              aria-label="Ver en GitHub"
            />

            {/* Botón para ir a la aplicación */}
            <Button
              label="Ir a la App"
              icon="pi pi-arrow-right"
              className="p-button-rounded p-button-success bg-green-500 hover:bg-green-600 text-white border-none transition-colors duration-300"
              onClick={goToApp}
              aria-label="Ir a la aplicación"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
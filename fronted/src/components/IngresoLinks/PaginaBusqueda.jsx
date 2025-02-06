import React, { useState } from 'react';
import ytService from '../../services/yt-service';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import YouTubePlayer from '../NotasMusicales/YouTubePlayer';


const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-white text-2xl">Cargando...</div>
  </div>
);

const PaginaBusqueda = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async (searchQuery) => {
    setLoading(true); // Establecemos el estado de carga a verdadero
    await getVideos(searchQuery);
    setLoading(false); // Desactivamos el estado de carga
  };

  const getVideos = async (searchQuery) => {
    try {
      const data = await ytService.getVideos(searchQuery);
      console.log(data);
      setQuery(searchQuery);
      setResults(data); // Asumiendo que la respuesta de la API tiene un campo `items`
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center p-4">

      <div className="w-full max-w-4xl mb-4">
        <Button
          label="Ir al Inicio"
          icon="pi pi-home"
          className="p-button-secondary p-button-lg"
          onClick={() => navigate('/')} // Navegar a la ruta principal ("/")
        />
      </div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full max-w-4xl">
          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
            Busca tus canciones favoritas
          </h1>

          {/* Formulario de búsqueda */}
          <div className="mb-8">
            <div className="p-inputgroup">
              <InputText
                placeholder="Busque o pegue una URL válida aquí"
                className="w-full p-inputtext-lg"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <Button
                label="Buscar"
                icon="pi pi-search"
                className="p-button-success p-button-lg"
                onClick={() => handleSearch(query)}
              />
            </div>
          </div>

          {/* Resultados */}
          {query && (
            <Card className="bg-gray-800 border-none shadow-none">
              <h2 className="text-2xl font-bold text-white mb-4">
                Resultados para: {query}
              </h2>
            </Card>
          )}

            <YouTubePlayer url={query} />

        </div>
      )}
    </div>
  );
};

export default PaginaBusqueda;
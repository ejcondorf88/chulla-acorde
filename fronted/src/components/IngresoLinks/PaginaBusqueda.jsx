import React, { useState } from 'react';
import ytService from '../../services/yt-service';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import YouTubePlayer from '../NotasMusicales/YouTubePlayer';
import { YoutubeProcessor } from '../NotasMusicales/YtProcessor';

// Componente de carga
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

  // Manejar la búsqueda
  const handleSearch = async () => {
    if (!query) return; // Validar que la consulta no esté vacía
    setLoading(true);
    try {
      const data = await ytService.getVideos(query);
      setResults(data); // Asumiendo que la respuesta de la API tiene un campo `items`
    } catch (error) {
      console.error('Error fetching videos:', error);
      setResults(null); // Limpiar resultados en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Manejar la tecla "Enter" en el input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center p-4">
      {/* Botón para ir al inicio */}
      <div className="w-full max-w-4xl mb-8">
        <Button
          label="Ir al Inicio"
          icon="pi pi-home"
          className="p-button-secondary p-button-lg"
          onClick={() => navigate('/')}
        />
      </div>

      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full max-w-4xl">
          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
            Busca tus canciones favoritas
          </h1>

          {/* Formulario de búsqueda */}
          <YoutubeProcessor />


          {/* Resultados */}
          {results && (
            <Card className="bg-gray-800 border-none shadow-none mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Resultados para: {query}
              </h2>
              {/* Aquí puedes mostrar los resultados de la búsqueda */}
              {/* Por ejemplo, una lista de videos */}
              <div className="text-white">
                {results.items?.map((item) => (
                  <div key={item.id.videoId} className="mb-4">
                    <h3 className="text-xl font-semibold">{item.snippet.title}</h3>
                    <p className="text-gray-300">{item.snippet.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Reproductor de YouTube */}
          {query && <YouTubePlayer url={query} />}
        </div>
      )}
    </div>
  );
};

export default PaginaBusqueda;
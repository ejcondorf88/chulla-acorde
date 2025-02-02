import React, { useState } from 'react';
import ytService from '../../services/yt-service';
import { data } from 'react-router-dom';

// Componente de Carga
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-white text-2xl">Cargando...</div>
  </div>
);

const SearchInput = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Busque o pegue una URL válida aquí"
          className="w-full px-6 py-4 text-lg bg-neutral-900 border border-neutral-700 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

const SearchIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Header = () => (
  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
    Click en Buscar para Obtener los Acordes
  </h1>
);

const PaginaBusqueda = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

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
      setResults(data); 
  ; // Asumiendo que la respuesta de la API tiene un campo `items`
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-16 ">
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full max-w-4xl">
          <Header />
          <SearchInput onSearch={handleSearch} />

          {query && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Resultados para: {query}
              </h2>
              <div>
                {results.name}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaginaBusqueda;
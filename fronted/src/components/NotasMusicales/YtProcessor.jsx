import React, { useState } from 'react';
import axios from 'axios';

export const YoutubeProcessor = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para manejar el envío de la URL
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se recargue
    setLoading(true);
    setError(null);

    try {
      // Enviar la solicitud POST al backend
      const result = await axios.post('http://localhost:8000/api/process_youtube', {
        url: url,
      });

      // Guardar la respuesta en el estado
      setResponse(result.data);
    } catch (err) {
      // Manejar errores
      setError('Error al procesar la URL. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Procesar URL de YouTube</h1>

      {/* Formulario para ingresar la URL */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Pega la URL de YouTube aquí"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Procesando...' : 'Procesar'}
          </button>
        </div>
      </form>

      {/* Mostrar errores */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Mostrar la respuesta del backend */}
      {response && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Resultados:</h2>
          <pre className=" text-gray-800 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};


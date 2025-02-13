import React, { useState } from "react";
import { Music, FileAudio, Library } from "lucide-react";
import axios from "axios";
import YouTubePlayer from "./YouTubePlayer";
import Partitura from "./Partitura";

export const YoutubeProcessor = () => {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post("http://localhost:8000/api/process_youtube", {
        url: url,
      });
      setResponse(result.data);
    } catch (err) {
      setError("Error al procesar la URL. Por favor, inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen max-w-4xl mx-auto bg-black relative">
      <h1 className="text-2xl font-bold mb-4">Procesar URL de YouTube</h1>

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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Procesando..." : "Procesar"}
          </button>
        </div>
      </form>

      {/* Pantalla de carga */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-700">Procesando video...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {response?.success && response?.data && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <YouTubePlayer url={url} />
          <div className="grid gap-6">
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Artista</h3>
                <p className="text-lg font-semibold">{response.data.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-purple-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Título de la canción</h3>
                <p className="text-lg font-semibold">{response.data.song_title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Library className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
                <p className="text-lg font-semibold">{response.data.Library}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileAudio className="w-6 h-6 text-amber-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ruta del audio</h3>
                <p className="text-lg font-semibold break-all">{response.data.audio_path}</p>
              </div>
            </div>

            {response.data.lyrics && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Letra</h3>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {response.data.lyrics}
                </div>
              </div>
            )}

            {/* Sección de acordes */}
            {response.data.acordes && response.data.acordes.length > 0 && (
              <div className="mt-4">
                {response.data.acordes && (
                <div className="mt-6">
                   <h3 className="text-sm font-medium text-gray-500 mb-2">Partitura</h3>
                    <Partitura acordes={response.data.acordes} />
                  </div>
                )}

              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeProcessor;

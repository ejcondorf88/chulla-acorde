import { useState } from 'react';

const BarraLinks = () => {
  const [url, setUrl] = useState('');
  const [chords, setChords] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);

    // Simulamos un proceso de obtener los acordes desde YouTube
    setTimeout(() => {
      setChords('A - E - F#m - D'); // Simulación de acordes
      setLoading(false);
    }, 2000); // Simulando un retraso
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600">Obten los Acordes de la Canción</h1>
        <p className="text-center text-gray-600 mt-2">Pega el enlace de YouTube para extraer los acordes musicales</p>
        
        <div className="mt-6">
          <input
            type="url"
            placeholder="Pega el link de YouTube aquí..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <button 
            onClick={handleSubmit} 
            className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Procesando...' : 'Obtener Acordes'}
          </button>
        </div>

        {chords && !loading && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700">Acordes Extraídos:</h2>
            <p className="text-green-700">{chords}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarraLinks;

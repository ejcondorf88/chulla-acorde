import React, { useState, useEffect } from "react";

const AcordesPlayer = ({ acordes = [] }) => {  // Valor por defecto para evitar undefined
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (acordes.length === 0) return; // No ejecutar si el array está vacío

    const intervalo = setInterval(() => {
      setIndice((prevIndice) => (prevIndice + 1) % acordes.length);
    }, 1000); 

    return () => clearInterval(intervalo);
  }, [acordes]);

  if (acordes.length === 0) {
    return (
      <div className="text-center text-white">
        <h2>No hay acordes disponibles</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Acorde Actual</h1>
      <div className="text-6xl font-bold bg-purple-600 p-6 rounded-lg shadow-lg">
        {acordes[indice]}
      </div>
    </div>
  );
};

export default AcordesPlayer;

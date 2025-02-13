const YouTubePlayer = ({ url }) => {
  if (!url) return null;

  console.log("YouTube URL:", url); // Para depuración en la consola

  // Función para extraer el ID del video
  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(url);
  if (!videoId) return null; // Si no se puede extraer el ID, no renderizar nada

  return (
    <div className="w-full max-w-4xl aspect-video mt-8">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;

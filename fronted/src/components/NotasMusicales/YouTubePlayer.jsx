 const YouTubePlayer = ({ url }) => {
  if (!url) return null;

  return (
    <div className="w-full max-w-4xl aspect-video mt-8">
      <iframe
        src={`https://www.youtube.com/embed/${extractVideoId(url)}`} // Extraer el ID del video
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

// Función para extraer el ID del video de una URL de YouTube
const extractVideoId = (url) => {
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default YouTubePlayer;
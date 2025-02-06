import React, { useState, useEffect  } from "react";
import ReactPlayer from "react-player";
import TabEditor from "./TabEditor";
import AcordesPlayer from "./AcordesPlayer";

const YouTubePlayer = ({ url }) => {
    const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (url) {
      setVideoUrl(url);  // Si hay una URL, la asignamos a videoUrl
    }
  }, [url]);  // Este efecto se ejecutará cada vez que la URL cambie

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center p-4">
      {videoUrl && (
        <>
          <div className="mt-4">
            <ReactPlayer url={videoUrl} controls width="100%" />  {/* Reproduce el video usando videoUrl */}
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white mb-40">
            Tus notas musicales son:
          </h1>

          <AcordesPlayer />
        </>
      )}
    </div>
  );
};

export default YouTubePlayer;

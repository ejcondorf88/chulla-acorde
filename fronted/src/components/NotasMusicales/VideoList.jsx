import React, { useEffect, useState } from "react";
import YTService from "../../services/yt-service";


const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await YTService.getVideos("guitar tutorials");
        setVideos(response);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Videos</h2>
      <ul>
        {videos.length > 0 ? (
          videos.map((video, index) => <li key={index}>{video.title}</li>)
        ) : (
          <p>Cargando videos...</p>
        )}
      </ul>
    </div>
  );
};

export default VideoList;

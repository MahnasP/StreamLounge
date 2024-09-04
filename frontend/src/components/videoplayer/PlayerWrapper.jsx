import React, { useRef } from 'react'
import videojs from "video.js";
import VideoPlayer from './VideoPlayer';

function PlayerWrapper() {
    const playerRef = useRef(null);

    //get from get request
    const videoLink = "http://localhost:3000/uploads/videos/38b93568-0d52-4986-956e-9abe29e77412/index.m3u8";
    
    const videoPlayerOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: videoLink,
                type:"application/x-mpegURL"
            }
        ],
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on("waiting", () => {
          videojs.log("player is waiting");
        });
    
        player.on("dispose", () => {
          videojs.log("player will dispose");
        });
      };

  return (
      <div className=' flex items-center justify-center'>
          <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
      </div>
  )
}

export default PlayerWrapper
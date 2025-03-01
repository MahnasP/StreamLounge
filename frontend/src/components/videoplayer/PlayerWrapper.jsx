import React, { useRef } from "react";
import videojs from "video.js";
import VideoPlayer from "./VideoPlayer";

function PlayerWrapper({ episodeLink }) {
  const playerRef = useRef(null);

  const videoLink = episodeLink;

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };

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
    <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
  );
}

export default PlayerWrapper;

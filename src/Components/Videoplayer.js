import React, { useRef } from "react";
import YouTube from "react-youtube";

const Videoplayer = ({ videoId, title, channelName }) => {
  const playerRef = useRef(null);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const playerOptions = {
    playerVars: {
      controls: 1,
      autoplay: 0,
      showinfo: 1,
    },
  };

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={{ ...playerOptions, width: "100%", height: "200px" }}
        onReady={onReady}
        containerClassName="rounded-player-container"
      />

      <h3 className="channel-name">{title}</h3>
      <p className="video-title">{channelName}</p>
    </div>
  );
};

export default Videoplayer;

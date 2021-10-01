import React from "react";
import { useLocation } from "react-router-dom";
import "./watchVideo.scss";

const WatchVideo = () => {
  const video = useLocation();

  return (
    <div className="watch">
      <div className="videoContainer">
        <video src={video.state} autoPlay controls></video>
      </div>
    </div>
  );
};

export default WatchVideo;

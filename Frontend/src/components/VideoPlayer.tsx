import React from "react";

interface BackgroundVideoPlayerProps {
  src: string;
  opacity?: number;
}

const BackgroundVideoPlayer: React.FC<BackgroundVideoPlayerProps> = ({
  src,
  opacity = 0.5,
}) => {
  return (
    <div className="background-video-container fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <video
        className="w-full h-full object-cover"
        style={{ opacity: opacity }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideoPlayer;

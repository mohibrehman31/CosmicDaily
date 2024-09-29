import React from "react";
import { ApodData } from "../features/apod/apodAPI";
import Generating from "./Generating";

interface ApodContentProps {
  status: "idle" | "loading" | "succeeded" | "failed";
  apodData: ApodData | null;
}

const ApodContent: React.FC<ApodContentProps> = ({ status, apodData }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-n-8">
        <Generating className="w-full h-full" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-n-8 text-n-1">
        Failed to load APOD. Please try again later.
      </div>
    );
  }

  if (status === "succeeded" && apodData) {
    return (
      <>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-n-8">
            <Generating className="w-full h-full" />
          </div>
        )}
        <img
          src={apodData.url}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          alt={apodData.title}
          onLoad={handleImageLoad}
        />
      </>
    );
  }

  return null;
};

export default ApodContent;
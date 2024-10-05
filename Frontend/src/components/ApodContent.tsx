import React, { useState } from "react";
import { ApodData } from "../types/types";

interface ApodContentProps {
  status: "idle" | "loading" | "succeeded" | "failed";
  apodData: ApodData | null;
  isClicked: boolean;
  onClickChange: () => void;
}

const ApodContent: React.FC<ApodContentProps> = ({
  status,
  apodData,
  isClicked,
  onClickChange,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isClicked) {
      onClickChange();
    }
  };

  const handleImageClick = () => {
    onClickChange();
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="absolute inset-0 bg-n-8">
        <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          <div className="flex items-center justify-center h-full">
            <svg
              className="w-12 h-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>
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
      <div
        className="relative w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-20 cursor-pointer ${
            isHovered && !isClicked ? "opacity-100" : "opacity-0"
          }`}
          style={{
            borderRadius: "0.9rem",
          }}
          onClick={handleImageClick}
        >
          <span className="text-white text-lg font-semibold">
            Click to display information
          </span>
        </div>

        <img
          src={apodData.url}
          style={{
            borderTopLeftRadius: "0.9rem",
            borderTopRightRadius: "0.9rem",
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          alt={apodData.title}
          onLoad={handleImageLoad}
        />

        {isClicked && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 md:p-4 overflow-y-auto z-30">
            <div className="w-11/12 md:w-5/6 lg:w-3/4 text-center">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 text-white">
                {apodData.title}
              </h2>
              <p className="mb-1 md:mb-2 text-white text-sm md:text-base">
                <strong>Date:</strong> {apodData.date}
              </p>
              <p className="mb-2 md:mb-4 text-white text-xs md:text-sm lg:text-base">
                {apodData.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ApodContent;

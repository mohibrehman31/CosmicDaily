import React, { useState } from "react";
import { heroBackground } from "../assets";
import { ApodData } from "../features/apod/apodAPI";
import ApodContent from "./ApodContent";
import HeroParallaxIcons from "./HeroParallaxIcons";
import { BackgroundCircles, Gradient } from "./design/Hero";

interface HeroImageProps {
  apodData: ApodData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const HeroImage: React.FC<HeroImageProps> = ({ apodData, status }) => {
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    if (apodData) {
      setShowDetails(!showDetails);
    }
  };

  return (
    <div className="relative w-full max-w-[23rem] mx-auto md:max-w-3xl lg:max-w-5xl xl:mb-24">
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div
          className="relative bg-n-8 rounded-[1rem] group cursor-pointer"
          onClick={handleClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
          <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
            <ApodContent status={status} apodData={apodData} />
            <HeroParallaxIcons />
            {!showDetails && isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                <p className="text-white text-base md:text-lg lg:text-xl font-bold text-center px-2 md:px-4">
                  Click to explore the Astronomy Picture of the Day
                </p>
              </div>
            )}
            {showDetails && apodData && isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 md:p-4 overflow-y-auto">
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
        </div>
        <Gradient />
      </div>
      <img
        src={heroBackground}
        className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]"
        width={1440}
        height={1800}
        alt="hero background"
      />
      <BackgroundCircles parallaxRef={parallaxRef} />
    </div>
  );
};

export default HeroImage;

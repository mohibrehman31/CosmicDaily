import React, { useState, useRef } from "react";
import { heroBackground } from "../assets";
import { ApodData } from "../types/types";
import ApodContent from "./ApodContent";
import HeroParallaxIcons from "./HeroParallaxIcons";
import { BackgroundCircles, Gradient } from "./design/Hero";

interface HeroImageProps {
  apodData: ApodData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const HeroImage: React.FC<HeroImageProps> = ({ apodData, status }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="relative w-full max-w-[23rem] mx-auto md:max-w-3xl lg:max-w-5xl xl:mb-24">
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-n-8 rounded-[1rem] group">
          <div className="aspect-[33/40] rounded-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
            <ApodContent
              status={status}
              apodData={apodData}
              isClicked={isClicked}
              onClickChange={handleClick}
            />
            <HeroParallaxIcons isClicked={isClicked} />
          </div>
        </div>
        <Gradient />
      </div>
      <img
        src={heroBackground}
        alt="hero background"
        style={{ opacity: 0.25 }}
        className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]"
      />
      <BackgroundCircles parallaxRef={parallaxRef} />
    </div>
  );
};

export default HeroImage;

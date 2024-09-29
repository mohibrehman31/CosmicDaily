import React from "react";
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

  return (
    <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-n-8 rounded-[1rem]">
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
          <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
            <ApodContent status={status} apodData={apodData} />
            <HeroParallaxIcons />
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

import React from "react";
import { curve } from "../assets";
import RasaChat from "./RasaChat";

const HeroContent: React.FC = () => (
  <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
    <h1 className="h1 mb-6">
      Your Gateway to{" "}
      <span className="inline-block relative">
        NASA's{" "}
        <img
          src={curve}
          className="absolute top-full left-0 w-full xl:-mt-2"
          width={624}
          height={28}
          alt="Curve"
        />
      </span>{" "}
      Frontier of Discovery
    </h1>
    <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
      Embark on a Digital Space Odyssey. Unlock the Mysteries of the Cosmos
      Through Interactive Exploration and CosmosAI.
    </p>
    <div className="flex justify-center">
      <RasaChat />
    </div>
  </div>
);

export default HeroContent;

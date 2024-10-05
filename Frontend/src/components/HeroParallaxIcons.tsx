import React from "react";
import { ScrollParallax } from "react-just-parallax";
import { heroIcons } from "../constants";
import Notification from "./Notification";

interface HeroParallaxIconsProps {
  isClicked?: boolean;
}

const HeroParallaxIcons: React.FC<HeroParallaxIconsProps> = ({ isClicked }) => (
  <>
    <ScrollParallax isAbsolutelyPositioned>
      <ul
        className={`hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex transition-transform duration-1000 ease-in-out ${
          isClicked ? "-translate-x-96" : ""
        }`}
      >
        {heroIcons.map((icon, index) => (
          <li className="p-5" key={index}>
            <img src={icon} width={24} height={25} alt={`Icon ${index + 1}`} />
          </li>
        ))}
      </ul>
    </ScrollParallax>
    <ScrollParallax isAbsolutelyPositioned>
      <Notification
        className={`hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex transition-transform duration-1000 ease-in-out ${
          isClicked ? "translate-x-96" : ""
        }`}
        title="Astronomy Picture of the Day"
      />
    </ScrollParallax>
  </>
);

export default HeroParallaxIcons;

import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchApod } from "../features/apod/apodSlice";
import Section from "./Section";
import { BottomLine } from "./design/Hero";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: apodData, status } = useAppSelector((state) => state.apod);

  React.useEffect(() => {
    dispatch(fetchApod());
  }, [dispatch]);

  return (
    <Section
      className="pt-[4rem] -mt-[8.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="lg:pt-[8rem] lg:-mt-[8.25rem]"
      id="hero"
    >
      <div className="container relative">
        <HeroContent />
        <HeroImage apodData={apodData} status={status} />
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;

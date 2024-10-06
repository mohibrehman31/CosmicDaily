import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroImage from "../HeroImage";
import { ApodData } from "../../types/types";

const mockApodData = {
  url: "/images/hero.jpg",
  title: "Hero Image",
  explanation: "Test explanation",
  date: "2024-02-29",
  mediaType: "image",
};

describe("HeroImage", () => {
  it("renders the hero image", () => {
    render(<HeroImage apodData={mockApodData as ApodData} status="idle" />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });

  it("has correct alt text", () => {
    render(<HeroImage apodData={mockApodData as ApodData} status="idle" />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("alt", "Hero Image");
  });

  it("applies correct CSS classes", () => {
    render(<HeroImage apodData={mockApodData as ApodData} status="idle" />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveClass("hero-image");
  });

  it("renders with correct source", () => {
    render(<HeroImage apodData={mockApodData as ApodData} status="idle" />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute(
      "src",
      expect.stringContaining("/images/hero.jpg")
    );
  });
});

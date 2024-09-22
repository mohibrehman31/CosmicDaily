import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  typingSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <div className="typing-effect">
      <p className="font-mono text-lg">{displayedText}</p>
      <span className="cursor inline-block w-2 h-5 bg-black animate-pulse"></span>
    </div>
  );
};

export default TypingEffect;

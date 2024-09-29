import React from "react";
import ButtonSvg from "../assets/svg/ButtonSvg";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
}) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };

  const renderButton = () => (
    <button className={classes} onClick={handleClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white as boolean)}
    </button>
  );

  return renderButton();
};

export default Button;

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-lg ${className}`}
  >
    {children}
  </div>
);

import React from "react";
import { SolData } from "../types/types";

interface SolCardProps {
  sol: SolData;
}

export const SolCard: React.FC<SolCardProps> = ({ sol }) => (
  <div className="sol-card">
    <h3>Sol </h3>
    <p>Date: {new Date(sol.First_UTC).toLocaleDateString()}</p>
    <p>Average Temperature: {sol.AT.av}°C</p>
    <p>Min Temperature: {sol.AT.mn}°C</p>
    <p>Max Temperature: {sol.AT.mx}°C</p>
  </div>
);

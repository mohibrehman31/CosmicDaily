import React from "react";
import { SolData } from "../types/types";

interface WeatherOverviewProps {
  latestSol: SolData;
}

export const WeatherOverview: React.FC<WeatherOverviewProps> = ({ latestSol }) => (
  <div className="weather-overview">
    <h2>Latest Weather on Mars</h2>
    <p>Date: {new Date(latestSol.First_UTC).toLocaleDateString()}</p>
    <p>Average Temperature: {latestSol.AT.av}°C</p>
    <p>Min Temperature: {latestSol.AT.mn}°C</p>
    <p>Max Temperature: {latestSol.AT.mx}°C</p>
    {/* Add more weather information as needed */}
  </div>
);

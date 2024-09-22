import React from "react";
import { GlassCard } from "./GlassCard";
import { SolData } from "../types";

interface WeatherOverviewProps {
  latestSol: string;
  latestData: SolData;
  overallHigh: number;
  overallLow: number;
  averageTemp: number;
  mostCommonWind: string;
}

export const WeatherOverview: React.FC<WeatherOverviewProps> = ({
  latestSol,
  latestData,
  overallHigh,
  overallLow,
  averageTemp,
  mostCommonWind,
}) => (
  <GlassCard className="mb-8">
    <h2 className="text-3xl font-bold text-white">Weather Overview</h2>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <p className="text-xl text-white">Latest Sol: {latestSol}</p>
        <p className="text-xl text-white">
          Date: {new Date(latestData.First_UTC).toLocaleDateString()}
        </p>
        <p className="text-xl text-white">
          Today's High: {latestData.AT.mx.toFixed(1)}° C
        </p>
        <p className="text-xl text-white">
          Today's Low: {latestData.AT.mn.toFixed(1)}° C
        </p>
      </div>
      <div>
        <p className="text-xl text-white">
          Overall High: {overallHigh.toFixed(1)}° C
        </p>
        <p className="text-xl text-white">
          Overall Low: {overallLow.toFixed(1)}° C
        </p>
        <p className="text-xl text-white">
          Average Temp: {averageTemp.toFixed(1)}° C
        </p>
        <p className="text-xl text-white">Common Wind: {mostCommonWind}</p>
      </div>
    </div>
  </GlassCard>
);

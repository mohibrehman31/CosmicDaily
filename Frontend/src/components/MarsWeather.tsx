import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchMarsWeather } from "../features/marsWeather/marsWeatherSlice";
import { marsBackgroundImage } from "../assets";
import { MarsWeatherData } from "./types";
import { GlassCard } from "./GlassCard";

export const MarsWeatherDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.marsWeather
  ) as { data: MarsWeatherData | null; status: string; error: string | null };

  useEffect(() => {
    if (status === "idle") {
      console.log("Fetching Mars weather data...");
      dispatch(fetchMarsWeather());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="text-white text-center text-2xl">
        Loading Mars weather data...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-red-500 text-center text-2xl">Error: {error}</div>
    );
  }

  if (!data) {
    return null;
  }
  const latestSol = data.sol_keys[0];
  const latestData = data.sols[latestSol];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${marsBackgroundImage})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white text-center">
          Mars Weather at Elysium Planitia
        </h1>
        <p className="mb-8 text-xl text-white text-center">
          Daily weather measurements from NASA's InSight lander
        </p>

        <GlassCard className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Sol {latestData.sol}
          </h2>
          <p className="text-xl text-white">
            {new Date(latestData.lastUTC).toLocaleDateString()}
          </p>
          <p className="text-2xl mt-2 text-white">
            High: {latestData.temperature.max.toFixed(1)}° C | Low:{" "}
            {latestData.temperature.min.toFixed(1)}° C
          </p>
        </GlassCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {data.sol_keys.map((sol: any) => {
            const i = data.sols[sol];
            return (
              <GlassCard key={sol}>
                <p className="font-bold text-white">Sol {i.sol}</p>
                <p className="text-sm text-white">
                  {new Date(i.lastUTC).toLocaleDateString()}
                </p>
                <p className="mt-2 text-white">
                  High: {i.temperature.max.toFixed(1)}° C
                </p>
                <p className="text-white">
                  Low: {i.temperature.min.toFixed(1)}° C
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

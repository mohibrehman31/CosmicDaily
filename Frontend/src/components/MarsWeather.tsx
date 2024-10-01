import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchMarsWeather } from "../features/marsWeather/marsWeatherSlice";
import { marsBackgroundImage } from "../assets";
import { MarsWeatherData } from "../types";
import { GlassCard } from "./GlassCard";
import { useEffect } from "react";

export const MarsWeatherDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.marsWeather
  ) as { data: MarsWeatherData | null; status: string; error: string | null };
  const renderSkeleton = () => (
    <div className="min-h-screen bg-[#0E0C15] text-gray-200 relative">
      <div className="max-w-6xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-10 bg-purple-300 bg-opacity-20 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-purple-300 bg-opacity-20 rounded w-1/2 mx-auto mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
              >
                <div className="h-6 bg-purple-300 bg-opacity-20 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-purple-300 bg-opacity-20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-purple-300 bg-opacity-20 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMarsWeather());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return renderSkeleton();
  }

  if (status === "failed") {
    return <ErrorMessage error={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={backgroundStyles}>
      <div className="max-w-6xl mx-auto">
        <Header />
        <LatestWeather data={data} />
        <WeatherHistory data={data} />
      </div>
    </div>
  );
};

const ErrorMessage: React.FC<{ error: string | null }> = ({ error }) => (
  <div className="text-red-500 text-center text-2xl">Error: {error}</div>
);

const Header: React.FC = () => (
  <>
    <h1 className="text-5xl font-bold mb-4 text-white text-center">
      Mars Weather at Elysium Planitia
    </h1>
    <p className="mb-8 text-xl text-white text-center">
      Daily weather measurements from NASA's InSight lander
    </p>
  </>
);

const LatestWeather: React.FC<{ data: MarsWeatherData }> = ({ data }) => {
  const latestSol = data.sol_keys[0];
  const latestData = data.sols[latestSol];

  return (
    <GlassCard className="mb-8">
      <h2 className="text-3xl font-bold text-white">Sol {latestData.sol}</h2>
      <p className="text-xl text-white">
        {new Date(latestData.lastUTC).toLocaleDateString()}
      </p>
      <p className="text-2xl mt-2 text-white">
        High: {latestData.temperature.max.toFixed(1)}° C | Low:{" "}
        {latestData.temperature.min.toFixed(1)}° C
      </p>
    </GlassCard>
  );
};

const WeatherHistory: React.FC<{ data: MarsWeatherData }> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
    {data.sol_keys.map((sol) => (
      <WeatherCard key={sol} solData={data.sols[sol]} />
    ))}
  </div>
);

const WeatherCard: React.FC<{ solData: any }> = ({ solData }) => (
  <GlassCard>
    <p className="font-bold text-white">Sol {solData.sol}</p>
    <p className="text-sm text-white">
      {new Date(solData.lastUTC).toLocaleDateString()}
    </p>
    <p className="mt-2 text-white">
      High: {solData.temperature.max.toFixed(1)}° C
    </p>
    <p className="text-white">Low: {solData.temperature.min.toFixed(1)}° C</p>
  </GlassCard>
);

const backgroundStyles = `
  relative min-h-screen bg-cover bg-center bg-no-repeat p-8
  bg-[url(${marsBackgroundImage})]
  bg-[rgba(0,0,0,0.5)]
  bg-blend-overlay
`;

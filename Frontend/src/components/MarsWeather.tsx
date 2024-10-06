import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchMarsWeather } from "../features/marsWeather/marsWeatherSlice";
import { marsBackgroundImage } from "../assets";
import { MarsWeatherData } from "../types/types";
import { GlassCard } from "./GlassCard";
import Section from "./Section";

export const MarsWeatherDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.marsWeather
  ) as { data: MarsWeatherData | null; status: string; error: string | null };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMarsWeather());
    }
  }, [status, dispatch]);

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
    <Section
      className="pt-[2rem] -mt-[8.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings="lg:pt-[8rem] lg:-mt-[8.25rem]"
      id="mars-weather"
    >
      <div
        className="container min-h-screen max-w-max bg-cover bg-center bg-no-repeat p-8 bg-blend-overlay "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${marsBackgroundImage})`,
          opacity: 0.5,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <Header />
          <LatestWeather data={data} />
          <WeatherHistory data={data} />
        </div>
      </div>
    </Section>
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
  const latestSol = data.sol_keys[data.sol_keys.length - 1];
  const latestData = data.sols[latestSol];

  return (
    <GlassCard className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">Sol {latestData.sol}</h2>
        <p className="text-lg text-white">
          {new Date(latestData.lastUTC).toLocaleDateString()}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <WeatherSection title="Temperature" className="mb-2">
          <WeatherItem
            label="High"
            value={`${latestData.temperature.max.toFixed(1)}° C`}
          />
          <WeatherItem
            label="Low"
            value={`${latestData.temperature.min.toFixed(1)}° C`}
          />
          <WeatherItem
            label="Avg"
            value={`${latestData.temperature?.avg.toFixed(1)}° C`}
          />
        </WeatherSection>
        <div>
          <WeatherSection title="Pressure" className="mb-2">
            <WeatherItem
              label="Avg"
              value={`${latestData.pressure?.avg.toFixed(1)} Pa`}
            />
          </WeatherSection>
          <WeatherSection title="Wind">
            <WeatherItem
              label="Speed"
              value={`${latestData.windSpeed?.avg.toFixed(1)} m/s`}
            />
            <WeatherItem
              label="Direction"
              value={latestData?.windDirection?.most_common?.compass_point}
            />
          </WeatherSection>
        </div>
      </div>
    </GlassCard>
  );
};

const WeatherSection: React.FC<{
  title: string;
  className?: string;
  children: React.ReactNode;
}> = ({ title, className = "", children }) => (
  <div className={className}>
    <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
    {children}
  </div>
);

const WeatherItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center">
    <p className="text-lg text-white">{label}:</p>
    <p className="text-lg text-white font-medium">{value}</p>
  </div>
);

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

export default MarsWeatherDashboard;

import React, { useEffect, useState } from "react";
import AsteroidVisualization from "./Asteroid";
import { ResponsiveContainer } from "recharts";
import { AlertTriangle, Info } from "lucide-react";
import Chart from "./Chart";
import { DashboardData } from "../types/types";
import { SummaryCard } from "./SummaryCard";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { fetchAsteroids } from "../features/asteroid/asteroidSlice";

export const AsteroidDashboard: React.FC = () => {
  const [dummyData, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAsteroids())
      .unwrap()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  const renderSkeleton = () => (
    <div className="min-h-screen bg-[#0E0C15] text-gray-200 relative">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-purple-300">
            Asteroid Threat Level Dashboard
          </h1>

          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>

          {/* Chart Skeletons */}
          <div className="space-y-6">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-64 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-1/3 bg-gray-900 p-4 md:p-6 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-gray-300 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return renderSkeleton();
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#0E0C15] text-gray-200 relative">
      {/* Background Asteroid Visualization for mobile */}
      <div className="absolute inset-0 opacity-20 md:hidden">
        <AsteroidVisualization />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Main Dashboard Content */}
        <div className="w-full md:w-2/3 p-4 md:p-6 overflow-y-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-purple-300">
            Asteroid Threat Level Dashboard
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <SummaryCard
              title="Total Asteroids"
              value={dummyData?.totalAsteroids ?? 0}
              icon={<Info className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />}
            />
            <SummaryCard
              title="Closest Approach"
              value={
                dummyData?.closestApproach
                  ? `${dummyData.closestApproach.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })} km`
                  : "N/A"
              }
              icon={
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              }
            />
            <SummaryCard
              title="Highest Threat Score"
              value={dummyData?.highestThreatAsteroid?.threatScore ?? "N/A"}
              subtext={dummyData?.highestThreatAsteroid?.name ?? "Unknown"}
              icon={
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              }
            />
            <SummaryCard
              title="Most Common Threat"
              value={
                dummyData?.threatLevelBreakdown
                  ? Object.entries(dummyData.threatLevelBreakdown).reduce(
                      (a, b) => (a[1] > b[1] ? a : b)
                    )[0]
                  : "N/A"
              }
              subtext={
                dummyData?.threatLevelBreakdown
                  ? `${
                      Object.entries(dummyData.threatLevelBreakdown).reduce(
                        (a, b) => (a[1] > b[1] ? a : b)
                      )[1]
                    } asteroids`
                  : "N/A"
              }
              icon={
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              }
            />
          </div>

          {/* Threat Level Breakdown Chart */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-purple-300">
              Threat Level Breakdown
            </h2>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <Chart dummyData={dummyData as DashboardData} />
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/*  Rotating Asteroid  */}
        <div className="hidden md:flex md:w-1/3 bg-gray-900 items-center justify-center">
          <AsteroidVisualization backgroundColor="#0E0C15" />
        </div>
      </div>
    </div>
  );
};

export default AsteroidDashboard;

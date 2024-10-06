import React, { useEffect, useState } from "react";
import AsteroidVisualization from "./Asteroid";
import { ResponsiveContainer } from "recharts";
import { AlertTriangle, Info } from "lucide-react";
import Section from "./Section";
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
  }, [dispatch]);

  const renderSkeleton = () => (
    <div className="min-h-screen bg-[#0E0C15] text-gray-200 relative p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 overflow-y-auto relative z-10">
          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
        <div className="w-full lg:w-1/3 bg-gray-900 p-4 flex items-center justify-center mt-6 lg:mt-0">
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
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <Section crosses>
      <div className="flex flex-col items-center justify-center sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-purple-300 text-center">
          Asteroid Threat Level Breakdown
        </h1>
      </div>
      <div className="container min-h-screen bg-[#0E0C15] text-gray-200 relative">
        {/* Background Asteroid Visualization for mobile */}
        <div className="absolute inset-0 opacity-20 lg:hidden">
          <AsteroidVisualization />
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Dashboard Content */}
          <div className="w-full lg:w-2/3 p-4 sm:p-6 overflow-y-auto relative z-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <SummaryCard
                title="Total Asteroids"
                value={dummyData?.totalAsteroids ?? 0}
                icon={<Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />}
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
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                }
              />
              <SummaryCard
                title="Highest Threat Score"
                value={dummyData?.highestThreatAsteroid?.threatScore ?? "N/A"}
                subtext={dummyData?.highestThreatAsteroid?.name ?? "Unknown"}
                icon={
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
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
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                }
              />
            </div>
            {/* Threat Level Breakdown Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
              <div className="h-64 sm:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <Chart dummyData={dummyData as DashboardData} />
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center mt-4">
                <svg
                  className="w-6 h-6 text-yellow-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-sm font-small">
                  Click on the bars in the chart to view detailed information
                  about each threat level.
                </span>
              </div>
            </div>
          </div>

          {/*  Rotating Asteroid  */}
          <div className="hidden lg:flex lg:w-1/3 bg-[#0E0C15] items-center justify-center">
            <AsteroidVisualization />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AsteroidDashboard;

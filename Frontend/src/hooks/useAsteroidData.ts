import { useState, useEffect } from "react";
import { DashboardData } from "../types/asteroidTypes";
import { fetchAsteroidData } from "../api/asteroidApi";

export const useAsteroidData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const asteroidData = await fetchAsteroidData();
        setData(asteroidData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching data")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading, error };
};

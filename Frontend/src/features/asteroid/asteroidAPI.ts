import axios from "axios";

export interface AsteroidData {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_second: string;
    };
  }>;
}

const BASE_URL = "https://cosmic-daily.vercel.app/v1";

export const fetchAsteroidData = async (): Promise<AsteroidData[]> => {
  try {
    const response = await axios.get<AsteroidData[]>(`${BASE_URL}/asteroids`);
    return response.data;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    throw new Error("Failed to fetch asteroid data");
  }
};

import axios from "axios";
import { AsteroidData } from "../../types/types";
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

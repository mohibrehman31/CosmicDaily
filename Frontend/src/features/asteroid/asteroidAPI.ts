import axios from "axios";
import { DashboardData } from "../../types/types";
const BASE_URL = "https://cosmic-daily.vercel.app/v1";

export const fetchAsteroidData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get<DashboardData>(
      `${BASE_URL}/neoW/threat-dashboard`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    throw new Error("Failed to fetch asteroid data");
  }
};

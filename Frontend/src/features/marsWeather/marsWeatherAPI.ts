import axios from "axios";
import { MarsWeatherData } from "../../types/types";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/v1`;

export const fetchMarsWeatherData = async (): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get<MarsWeatherData>(`${BASE_URL}/insights/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Mars weather data:", error);
    throw new Error("Failed to fetch Mars weather data");
  }
};

export const fetchSpecificSolData = async (): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get<MarsWeatherData>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching specific sol data:", error);
    throw new Error("Failed to fetch specific sol data");
  }
};

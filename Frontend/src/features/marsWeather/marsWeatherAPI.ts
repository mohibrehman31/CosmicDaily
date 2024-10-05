import axios from "axios";
import { MarsWeatherData } from "../../types";

const BASE_URL = "https://cosmic-daily.vercel.app/v1";

export const fetchMarsWeatherData = async (): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get<MarsWeatherData>(`${BASE_URL}/insights/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetchSpecificSolData = async (): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get<MarsWeatherData>(BASE_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

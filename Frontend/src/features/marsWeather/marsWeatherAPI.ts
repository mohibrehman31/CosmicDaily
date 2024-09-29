import axios from "axios";
import { MarsWeatherData } from "../../components/types";

const API_KEY = "bEDbpmtVfTu3G999c4covubhMSarmGTJKF34G978";
const BASE_URL = "http://localhost:3001/v1/insights/";

export const fetchMarsWeatherData = async (): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get<MarsWeatherData>(BASE_URL, {
      params: {
        api_key: API_KEY,
        feedtype: "json",
        ver: "1.0",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetchSpecificSolData = async (
  sol: string
): Promise<MarsWeatherData> => {
  try {
    const response = await axios.get<MarsWeatherData>(BASE_URL, {
      params: {
        api_key: API_KEY,
        feedtype: "json",
        ver: "1.0",
        sol: sol,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

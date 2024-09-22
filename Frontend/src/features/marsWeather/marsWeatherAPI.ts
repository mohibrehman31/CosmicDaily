import axios from "axios";
import { MarsWeatherData } from "../../components/types"; // Ensure you have this type defined

const API_KEY = "bEDbpmtVfTu3G999c4covubhMSarmGTJKF34G978";
const BASE_URL = "http://localhost:3000/v1/insights/";

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
      // Handle Axios errors
      throw new Error(`API error: ${error.message}`);
    } else {
      // Handle other errors
      throw new Error("An unexpected error occurred");
    }
  }
};

// You can add more API calls related to Mars weather here if needed
// For example, fetching historical data, specific sol data, etc.

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

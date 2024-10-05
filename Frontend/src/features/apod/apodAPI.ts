import axios from "axios";
import { ApodData } from "../../types/types";

const BASE_URL = "https://cosmic-daily.vercel.app/v1";

export const fetchApodData = async (): Promise<ApodData> => {
  try {
    const response = await axios.get<ApodData>(`${BASE_URL}/apod`);
    return response.data;
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    throw new Error("Failed to fetch APOD data");
  }
};

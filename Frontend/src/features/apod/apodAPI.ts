import axios from "axios";

export interface ApodData {
  url: string;
  title: string;
  explanation: string;
  date: string;
  copyright?: string;
  mediaType: "image" | "video";
}

const API_BASE_URL = "https://api.nasa.gov/planetary/apod";

export const fetchApodData = async (): Promise<ApodData> => {
  try {
    const response = await axios.get<ApodData>(API_BASE_URL, {
      params: {
        api_key: process.env.REACT_APP_NASA_API_KEY,
      },
    });

    return {
      url: response.data.url,
      title: response.data.title,
      explanation: response.data.explanation,
      date: response.data.date,
      copyright: response.data.copyright,
      mediaType: response.data.mediaType,
    };
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    throw new Error("Failed to fetch APOD data");
  }
};

import { Backend_URL } from "../constants";

interface ApodData {
  picture: {
    url: string;
    title: string;
    explanation: string;
    date: string;
    copyright?: string;
  };
}

export const fetchApodData = async (): Promise<ApodData> => {
  try {
    const response = await fetch(`${Backend_URL}/apod`);
    if (!response.ok) {
      throw new Error("Failed to fetch APOD data");
    }
    const data = await response.json();

    return {
      picture: {
        url: data.url,
        title: data.title,
        explanation: data.explanation,
        date: data.date,
        copyright: data.copyright,
      },
    };
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    throw error;
  }
};

// Interface for the temperature data
export interface Temperature {
  max: number;
  min: number;
}

// Interface for individual sol data
export interface SolData {
  sol: number;
  lastUTC: string;
  temperature: Temperature;
}

// Interface for the sols object
export interface Sols {
  [key: string]: SolData;
}

// Main interface for the Mars weather data
export interface MarsWeatherData {
  sol_keys: string[];
  sols: Sols;
}

export interface MarsWeatherState {
  data: MarsWeatherData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

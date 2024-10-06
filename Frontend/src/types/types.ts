export interface SolData {
  First_UTC: string;
  AT: {
    av: number;
    mn: number;
    mx: number;
  };
  WD: {
    most_common: {
      compass_point: string;
      compass_degrees: number;
    };
  };
}
export interface Temperature {
  max: number;
  min: number;
  avg: number;
}
export interface AsteroidData {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_second: string;
    };
  }>;
}
export interface ApodData {
  url: string;
  hdurl?: string;
  title: string;
  explanation: string;
  date: string;
  copyright?: string;
  mediaType: "image" | "video";
  serviceVersion?: string;
}
export interface SolData {
  sol: number;
  lastUTC: string;
  temperature: Temperature;
  windSpeed: {
    avg: number;
    mn: number;
    mx: number;
  };
  pressure: {
    avg: number;
    mn: number;
    mx: number;
  };
  windDirection: {
    most_common: {
      compass_point: string;
      compass_degrees: number;
    };
  };
}
export interface Sols {
  [key: string]: SolData;
}
export interface MarsWeatherData {
  sol_keys: string[];
  sols: Sols;
}

export interface MarsWeatherState {
  data: MarsWeatherData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Asteroid {
  id: string;
  name: string;
  date: string;
  diameter: number;
  velocity: string;
  missDistance: string;
  threatScore: number;
  threatLevel: string;
}

export interface DashboardData {
  totalAsteroids: number;
  threatLevelBreakdown: Record<string, number>;
  closestApproach: number;
  highestThreatAsteroid: Asteroid;
  asteroids: Asteroid[];
}
export interface DummyData {
  threatLevelBreakdown: Record<string, number>;
  asteroids: Asteroid[];
}

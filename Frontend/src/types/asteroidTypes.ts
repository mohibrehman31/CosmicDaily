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

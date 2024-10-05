const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

/**
 * Get asteroids data for a given date range
 * @returns {Promise<Object>}
 */
const getAsteroids = async () => {
  try {
    const response = await axios.get(
      'https://api.nasa.gov/neo/rest/v1/feed?api_key=bEDbpmtVfTu3G999c4covubhMSarmGTJKF34G978'
    );

    if (response.status !== httpStatus.OK) {
      throw new ApiError(response.status, 'Failed to fetch asteroid data');
    }

    return processAsteroids(response.data.near_earth_objects);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while fetching asteroid data');
  }
};

/**
 * Process raw asteroid data
 * @param {Object} asteroidData - Raw asteroid data from NASA API
 * @returns {Array} - Processed asteroid data
 */
const processAsteroids = (asteroidData) => {
  const processedAsteroids = [];

  for (const date in asteroidData) {
    asteroidData[date].forEach((asteroid) => {
      const threatScore = calculateThreatScore(asteroid);
      processedAsteroids.push({
        id: asteroid.id,
        name: asteroid.name,
        date: date,
        diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
        velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second,
        missDistance: asteroid.close_approach_data[0].miss_distance.kilometers,
        threatScore: threatScore,
        threatLevel: getThreatLevel(threatScore),
      });
    });
  }

  return processedAsteroids;
};

/**
 * Calculate threat score for an asteroid
 * @param {Object} asteroid - Asteroid data
 * @returns {number} - Threat score
 */
const calculateThreatScore = (asteroid) => {
  const diameter = asteroid.estimated_diameter.meters.estimated_diameter_max;
  const velocity = parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second);
  const missDistance = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers);

  const score = (diameter * velocity) / (missDistance / 1000000);
  return Math.min(Math.max(score, 0), 100);
};

/**
 * Get threat level based on score
 * @param {number} score - Threat score
 * @returns {string} - Threat level
 */
const getThreatLevel = (score) => {
  if (score < 20) return 'Low';
  if (score < 50) return 'Medium';
  if (score < 80) return 'High';
  return 'Extreme';
};

module.exports = {
  getAsteroids,
};

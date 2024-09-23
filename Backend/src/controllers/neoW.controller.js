const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const neoWService = require('../services/neoW.service');
/**
 * Generate dashboard data from asteroid information
 * @param {Array} asteroids - List of asteroid objects
 * @returns {Object} Dashboard data
 */
const generateDashboard = (asteroids) => {
  const threatLevels = { Low: 0, Medium: 0, High: 0, Extreme: 0 };
  let closestApproach = Infinity;
  let highestThreatAsteroid = null;

  asteroids.forEach((asteroid) => {
    threatLevels[asteroid.threatLevel]++;

    if (parseFloat(asteroid.missDistance) < closestApproach) {
      closestApproach = parseFloat(asteroid.missDistance);
    }

    if (!highestThreatAsteroid || asteroid.threatScore > highestThreatAsteroid.threatScore) {
      highestThreatAsteroid = asteroid;
    }
  });

  return {
    totalAsteroids: asteroids.length,
    threatLevelBreakdown: threatLevels,
    closestApproach: closestApproach,
    highestThreatAsteroid: highestThreatAsteroid,
    asteroids: asteroids,
  };
};

/**
 * Get threat level dashboard
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getThreatLevelDashboard = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(httpStatus.BAD_REQUEST).json({
        code: httpStatus.BAD_REQUEST,
        message: 'Start date and end date are required',
      });
    }

    const asteroids = await neoWService.getAsteroids(startDate, endDate);

    const dashboard = generateDashboard(asteroids);

    res.status(httpStatus.OK).json(dashboard);
  } catch (error) {
    console.error('Error in getThreatLevelDashboard:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getThreatLevelDashboard,
};

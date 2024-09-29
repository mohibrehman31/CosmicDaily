const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

/**
 * Get InSight weather data
 * @returns {Promise<Object>}
 */
const getInsight = async () => {
  try {
    console.log(config.nasa.apiKey);
    const response = await axios.get(
      `https://api.nasa.gov/insight_weather/?api_key=bEDbpmtVfTu3G999c4covubhMSarmGTJKF34G978&feedtype=json&ver=1.0`
    );
    if (response.status !== httpStatus.OK) {
      throw new ApiError(response.status, 'Failed to fetch InSight data');
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while fetching InSight data');
  }
};

module.exports = {
  getInsight,
};

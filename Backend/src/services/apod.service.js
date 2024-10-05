const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

/**
 * Get APOD data
 * @returns {Promise<Object>}
 */
const getApod = async () => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: config.nasa.apiKey,
      },
    });
    if (response.status !== httpStatus.OK) {
      throw new ApiError(response.status, 'Failed to fetch APOD data');
    }
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while fetching APOD data');
  }
};

module.exports = {
  getApod,
};

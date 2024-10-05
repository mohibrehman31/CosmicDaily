const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { insightService } = require('../services');
const getInsight = catchAsync(async (req, res) => {
  const result = await insightService.getInsight();
  const sol_keys = result.sol_keys;
  const sols = {};

  sol_keys.forEach((sol) => {
    const solData = result[sol];
    sols[sol] = {
      sol: parseInt(sol),
      lastUTC: solData.Last_UTC,
      temperature: {
        max: solData.AT?.mx,
        min: solData.AT?.mn,
        avg: solData.AT?.av,
      },
      windSpeed: {
        avg: solData.HWS?.av,
      },
      pressure: {
        avg: solData.PRE?.av,
      },
      windDirection: {
        most_common: {
          compass_point: solData.WD?.most_common?.compass_point,
          compass_degrees: solData.WD?.most_common?.compass_degrees,
        },
      },
    };
  });

  res.status(httpStatus.OK).send({
    sol_keys,
    sols,
  });
});

module.exports = {
  getInsight,
};

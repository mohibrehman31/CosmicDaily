const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { apodService } = require('../services');

const getApod = catchAsync(async (req, res) => {
  const result = await apodService.getApod();

  res.status(httpStatus.OK).send({ ...result });
});
module.exports = {
  getApod,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { apodService } = require('../services');

const getApod = catchAsync(async (req, res) => {
  console.log("getApod");
  const result = await apodService.getApod();
  console.log(result);
  res.status(httpStatus.OK).send({ ...result });
});
module.exports = {
  getApod,
};

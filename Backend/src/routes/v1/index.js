const express = require('express');
// const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const insightsRoute = require('./insights.route');
const neoWRoute = require('./neoW.route');
const apodRoute = require('./apod.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/insights',
    route: insightsRoute,
  },
  {
    path: '/neoW',
    route: neoWRoute,
  },
  {
    path: '/apod',
    route: apodRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

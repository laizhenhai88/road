'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller, middlewares} = app;

  router.post('/api/road/save', controller.api.road.save);
  router.get('/api/road/', controller.api.road.get);
};

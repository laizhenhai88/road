const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = () => {
  return async function(ctx, next) {
    await next();
    if (ctx.header['content-type'] && ctx.header['content-type'].indexOf('application/json') != -1) {
      ctx.logger.info('%s  request: %j %s response: %j', os.EOL, ctx.request.body, os.EOL, ctx.body);
    } else if (ctx.request.method == 'GET' && ctx.response.header['content-type'] && ctx.response.header['content-type'].indexOf('application/json') != -1) {
      ctx.logger.info('%s response: %j', os.EOL, ctx.body);
    } else {
      ctx.logger.info(ctx.response.status);
    }
  };
};

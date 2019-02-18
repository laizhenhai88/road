const fs = require('fs');
const path = require('path');

module.exports = () => {
  return async function(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body && !ctx.request.url.startsWith('/api/')) {
      ctx.set('content-type', 'text/html; charset=utf-8');
      ctx.body = fs.createReadStream(path.join(__dirname, '../../dist/index.html'));
    }
  };
};

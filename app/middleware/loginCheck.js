const fs = require('fs');
const path = require('path');

module.exports = () => {
  return async function(ctx, next) {
    // 校验url，如果是需要登录的，则校验session
    if (ctx.request.url.startsWith('/api/') && !ctx.request.url.startsWith('/api/common/')) {
      // 校验session
      if (!ctx.session.user) {
        ctx.unsafeRedirect('/user/login')
        return
      }
    }
    await next();
  };
};

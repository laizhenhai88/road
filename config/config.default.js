'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520057524788_1411';

  // add your config here
  config.middleware = ['logHttp', 'notfound2index'];

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'dist')
  };

  config.multipart = {
    fileSize: '10mb'
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  };

  config.session = {
    key: 'EGG_SESS',
    maxAge: 100 * 24 * 3600 * 1000,
    httpOnly: true,
    encrypt: true
  };

  // config.logrotator = {
  //   filesRotateByHour: [
  //     path.join(appInfo.root, 'logs', appInfo.name, appInfo.name + '-web.log'),
  //     path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log'),
  //     path.join(appInfo.root, 'logs', appInfo.name, 'egg-agent.log'),
  //     path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
  //     path.join(appInfo.root, 'logs', appInfo.name, 'egg-web.log')
  //   ]
  // }

  config.logrotator = {
    maxDays: 2
  }

  // 以下配置易变

  config.mongoose = {
    url: 'mongodb://localhost:27017/road',
    options: {}
  };

  config.cluster = {
    listen: {
      port: 7003
    }
  };

  return config;
};

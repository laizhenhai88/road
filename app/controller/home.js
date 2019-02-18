'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hi cc'
    this.ctx.set('content-type', 'text/html; charset=utf-8');
    this.ctx.body = fs.createReadStream(path.join(__dirname, '../dist/index.html'));
  }
}

module.exports = HomeController;

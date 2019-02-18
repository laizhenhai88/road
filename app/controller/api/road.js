'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')
const path = require('path')

class MyController extends Controller {

  async save() {
    let r = new this.ctx.model.Road({touches:this.ctx.request.body})
    await r.save()

    this.ctx.body = {
      ok: true
    };
  }

  async get() {
    let r = await this.ctx.model.Road.find()

    this.ctx.body = {
      ok: true,
      road: r
    };
  }

}

module.exports = MyController;

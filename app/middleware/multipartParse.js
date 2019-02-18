const formidable = require('formidable');
const path = require('path');
const fs = require('fs')

module.exports = options => {
  // 如果上传文件夹不存在，则新建一个
  if (!fs.existsSync(options.uploadDir)) {
    fs.mkdirSync(options.uploadDir)
  }
  return async function(ctx, next) {
    const form = new formidable.IncomingForm();
    for (const opt in options) {
      form[opt] = options[opt];
    }
    await new Promise((resolve, reject) => {
      form.parse((ctx.req), (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        if (files.file) {
          files.file.basename = path.basename(files.file.path);
        }
        ctx.req.fields = fields;
        ctx.req.files = files;
        resolve();
      });
    });
    await next();
  };
};

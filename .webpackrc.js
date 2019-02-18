const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  html: {
    template: './src/index.ejs',
  },
  hash: true,
  ignoreMomentLocale: true,
  disableDynamicImport: false,
  publicPath: '/',
  proxy: {
    '/api': {
      target: 'http://localhost:7003',
      changeOrigin: true,
      secure: false,
    }
  }
};

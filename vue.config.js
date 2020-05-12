module.exports = {
  publicPath: '',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'z-progress-loading'
    }
  },
  css: {
    extract: false
  },
  productionSourceMap: false,
  devServer: {
    port: 3000
  },
};

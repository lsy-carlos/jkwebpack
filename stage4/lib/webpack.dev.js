
const Webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    // 构建是命令行的现实日志模式
    stats: 'errors-only',
  },
};

module.exports = merge(baseConfig, devConfig);

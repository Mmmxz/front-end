const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    contentBase: './dist',
    open: true,
    hot: true, // 开启hmr
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // 开发环境下使用 tree shaking
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)
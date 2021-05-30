const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    publicPath: 'http://www.cdn.com',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader'
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 204800 // 200kb
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_mudules/,
        loader: 'babel-loader'
        // 有了 .babelrc 后，就不需要写 options 了
        // options: {
        //   // presets: [['@babel/preset-env', {
        //   //   useBuiltIns: 'usage'
        //   // }]]
        //   'plugins': [['@babel/plugin-transform-runtime', {
        //     'corejs': 2,
        //     'helpers': true,
        //     'regenerator': true,
        //     'useESModules': false
        //   }]]
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
}
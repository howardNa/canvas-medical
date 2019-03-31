const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: [
      path.resolve(__dirname, './client/index.js')
    ],
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles sass to css, using node-sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "url-loader"
      }
    ]
  },
  mode: 'development',
  devServer: {
      inline: true,
      hot: true,
      contentBase: './dist',
      publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/index.html')
    }),
    new HotModuleReplacementPlugin()
  ]
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: [
      'webpack-dev-server/client?https://localhost:8080',
      'webpack/hot/dev-server',
      path.resolve(__dirname, './client/index.js')
    ],
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader" // translates CSS into CommonJS
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
      hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/index.html')
    }),
    new HotModuleReplacementPlugin()
  ]
};
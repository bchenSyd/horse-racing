var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.jsx?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
  }
];

module.exports = {
  devtool: 'source-map',
  entry: path.resolve('src', 'index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'horse racing',
      filename: 'index.html'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     pure_getters: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //     warnings: false
    //   }
    // })
  ],
  module: {
    loaders: loaders
  }
};

const path = require('path');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  entry: { main: 'aurelia-bootstrapper' },

  output: {
    path: path.join(__dirname, 'wwwroot', 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },

  resolve: {
    alias: {
        // Force all modules to use the same jquery version.
        'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
    },
    extensions: ['.ts', '.js'],
    modules: ['App', 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        issuer: /\.html?$/i
      },
      {
        test: /\.css$/i,
        loader: ['style-loader', 'css-loader'],
        issuer: /\.[tj]s$/i
      },
      { test: /\.html$/i, loaders: 'html-loader' },
      { test: /\.ts$/i, loaders: 'ts-loader' },
      // use Bluebird as the global Promise implementation:
      { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' },
      // exposes jQuery globally as $ and as jQuery:
      { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        loader: 'file-loader'
      },
    ]
  },

  plugins: [
    new AureliaPlugin(),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new ProvidePlugin({
      'Promise': 'bluebird',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    })
  ]
};

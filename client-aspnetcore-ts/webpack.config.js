const path = require('path');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const cssRules = [
  { loader: 'css-loader' },
];

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
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: extractCss ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssRules
        }) : ['style-loader', ...cssRules],
      },
      {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        issuer: /\.[tj]s$/i
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader'],
        issuer: /\.html?$/i
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
    new ProvidePlugin({
      'Promise': 'bluebird',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new ModuleDependenciesPlugin({
      'aurelia-testing': [ './compile-spy', './view-spy' ]
    }),
    new TsConfigPathsPlugin(),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      metadata: {
        // available in index.ejs //
        title, server, baseUrl
      }
    }),
    ...when(extractCss, new ExtractTextPlugin({
      filename: production ? '[contenthash].css' : '[id].css',
      allChunks: true
    })),
    ...when(production, new CommonsChunkPlugin({
      name: ['common']
    })),
    ...when(production, new CopyWebpackPlugin([
      { from: 'static/favicon.ico', to: 'favicon.ico' }
    ])),
    ...when(production, new UglifyJsPlugin({
      sourceMap: true
    }))
  ]
};

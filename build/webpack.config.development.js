import webpack from 'webpack';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config';
import _debug from 'debug';
import path from 'path';

const debug = _debug('app:webpack:config');
const paths = config.utils_paths;

const projectRoot = process.cwd();
debug('Create configuration.');

const webpackConfig = {
  name:    'client',
  target:  'web',
  devtool: 'source-map',
  resolve: {
    alias: {
      src:        `${projectRoot}/src`,
      components: `${projectRoot}/src/components`,
      modules:    `${projectRoot}/src/modules`,
      appRedux:   `${projectRoot}/src/redux`,
      styles:     `${projectRoot}/src/styles`
    },
    extensions: ['*', '.js', '.jsx', '.json'],
    modules:    [
      './src', // paths.client(),
      'node_modules'
    ]
  },
  module: {}
};

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  'main': [
    './src/main.js'
    // 'webpack-hot-middleware/client.js?path=/__webpack_hmr'
  ]
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename:   '[name].[hash].js',
  path:       paths.dist(),
  publicPath: config.compiler_public_path
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: './src/index.html', // paths.client('index.html'),
    hash:     false,
    favicon:  './src/static/favicon.ico', // paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject:   'body',
    minify:   {
      collapseWhitespace: true
    }
  })
];

debug('Enable plugins for live development (HMR, NoErrors).');
webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);
// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [{
  test:    /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader:  'babel-loader',
  query:   {
    cacheDirectory: true,
    plugins:        ['transform-runtime'],
    presets:        ['es2015', 'react', 'stage-0'],
    env:            {
      // production: {
      //   presets: ['react-optimize']
      // }
    }
  }
},
{
  test:   /\.json$/,
  loader: 'json-loader'
}];

// ------------------------------------
// Style Loaders
// ------------------------------------
webpackConfig.module.rules.push({
  test: /\.(css|sass|scss)$/,
  use:  ExtractTextPlugin.extract({
    fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
    use:      ['css-loader', 'sass-loader', 'postcss-loader']
  })
});

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

export default webpackConfig;

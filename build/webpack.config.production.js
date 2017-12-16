import webpack from 'webpack';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config';
import _debug from 'debug';
import path from 'path';

const debug = _debug('app:webpack:config');
const paths = config.utils_paths;
// const {__DEV__, __PROD__, __TEST__} = config.globals
const projectRoot = process.cwd();
debug('Create configuration.');

// const webpackConfig = {
//   name: 'client',
//   target: 'web',
//   devtool: config.compiler_devtool,
//   resolve: {
//     alias: {
//       src: `${projectRoot}/src`,
//       components: `${projectRoot}/src/components`,
//       modules: `${projectRoot}/src/modules`,
//       appRedux: `${projectRoot}/src/redux`,
//     },
//     root: paths.client(),
//     extensions: ['', '.js', '.jsx', '.json']
//   },
//   module: {}
// }
const webpackConfig = {
  name:    'client',
  target:  'web',
  devtool: 'null',
  resolve: {
    alias: {
      src:        `${projectRoot}/src`,
      components: `${projectRoot}/src/components`,
      modules:    `${projectRoot}/src/modules`,
      appRedux:   `${projectRoot}/src/redux`,
      styles:     `${projectRoot}/src/styles`
    },
    extensions: ['.js', '.jsx', '.json'],
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

// if (__DEV__) {
  // debug('Enable plugins for live development (HMR, NoErrors).')
  // webpackConfig.plugins.push(
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // )
// } else if (__PROD__) {
  // debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  // webpackConfig.plugins.push(
  //   new webpack.optimize.OccurrenceOrderPlugin(),
  //   //new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       unused: true,
  //       dead_code: true,
  //       warnings: false
  //     }
  //   })
  // )
// }

// Don't split bundles during testing, since we only want import one bundle
// if (!__TEST__) {
  // webpackConfig.plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({
  //     names: ['vendor']
  //   })
  // )
// //}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
[ NOTE ]
We no longer use eslint-loader due to it severely impacting build
times for larger projects. `npm run lint` still exists to aid in
deploy processes (such as with CI), and it's recommended that you
use a linting plugin for your IDE in place of this loader.

If you do wish to continue using the loader, you can uncomment
the code below and run `npm i --save-dev eslint-loader`. This code
will be removed in a future release.

webpackConfig.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'eslint',
  exclude: /node_modules/
}]

webpackConfig.eslint = {
  configFile: paths.base('.eslintrc'),
  emitWarning: __DEV__
}
*/

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
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
// const BASE_CSS_LOADER = 'css-loader?sourceMap&-minimize'

// // Add any packge names here whose styles need to be treated as CSS modules.
// // These paths will be combined into a single regex.
// const PATHS_TO_TREAT_AS_CSS_MODULES = [
//   // 'react-toolbox', (example)
// ]

// // If config has CSS modules enabled, treat this project's styles as CSS modules.
// if (config.compiler_css_modules) {
//   PATHS_TO_TREAT_AS_CSS_MODULES.push(
//     paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
//   )
// }

// const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
// const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)

// Loaders for styles that need to be treated as CSS modules.
// if (isUsingCSSModules) {
  // const cssModulesLoader = [
  //   BASE_CSS_LOADER,
  //   'modules',
  //   'importLoaders=1',
  //   'localIdentName=[name]__[local]___[hash:base64:5]'
  // ].join('&')

  // webpackConfig.module.rules.push({
  //   test: /\.scss$/,
  //   include: cssModulesRegex,
  //   use: [
  //     'style-loader',
  //     cssModulesLoader,
  //     'postcss-loader',
  //     'sass?sourceMap'
  //   ]
  // })

webpackConfig.module.rules.push({
  test: /\.(css|sass|scss)$/,
  use:  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use:      ['css-loader', 'sass-loader', 'postcss-loader']
  })
});

// }

// Loaders for files that should not be treated as CSS modules.
// const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false
// webpackConfig.module.rules.push({
//   test: /\.scss$/,
//   exclude: excludeCSSModules,
//   use: [
//     'style-loader',
//     BASE_CSS_LOADER,
//     'postcss-loader',
//     'sass?sourceMap'
//   ]
// })
// webpackConfig.module.rules.push({
//   test: /\.css$/,
//   exclude: excludeCSSModules,
//   use: [
//     'style-loader',
//     BASE_CSS_LOADER,
//     'postcss-loader'
//   ]
// })

// ------------------------------------
// Style Configuration
// ------------------------------------
// webpackConfig.sassLoader = {
//   includePaths: paths.client('styles')
// }

// webpackConfig.postcss = [
// webpackConfig.plugins.push(
//   cssnano({
//     autoprefixer: {
//       add: true,
//       remove: true,
//       browsers: ['last 2 versions']
//     },
//     discardComments: {
//       removeAll: true
//     },
//     discardUnused: false,
//     mergeIdents: false,
//     reduceIdents: false,
//     safe: true,
//     sourcemap: true
//   })
// )
// ]

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

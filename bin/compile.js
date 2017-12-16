import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfigDevelopment from '../build/webpack.config.development';
import webpackConfigProduction from '../build/webpack.config.production';
import logger from '../lib/logger';
import config from '../config';

let webpackConfig = webpackConfigDevelopment;

if (config.env === 'production') {
  webpackConfig = webpackConfigProduction;
}

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      }

      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.');
        logger.log(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.');
        logger.log(jsonStats.warnings.join('\n'));
      }
      resolve(stats);
    });
  });

const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info('Target application environment: ' + chalk.bold('development')))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    logger.info('Copying static assets from ./static to .dist.');
    fs.copySync(
      path.resolve(__dirname, '../src', 'static'),
      path.resolve(__dirname, '..', 'dist')
    );
    return stats;
  })
  .then((stats) => {
    if (false) {
      logger.log(stats.toString({
        colors: true,
        chunks: false
      }));
    }
    logger.success('Compiler finished successfully! See .dist.');
  })
  .catch((err) => logger.error('Compiler encountered errors.', err));

compile();

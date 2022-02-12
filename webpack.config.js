const zlib = require("zlib");
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const path = require("path");

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
        new TerserPlugin({
        })],
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            use: ['babel-loader']
          }
        ]
      },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.appSrc}/**/*`, { nodir: true }),
      safelist: {
        standard: [/owl/, /ng-star/, /row/, /container/, /col/, /slideInUp/, /fadeIn/, /fadeInDown/],
        deep: [/owl/, /ng-star/, /row/, /container/, /col/, /slideInUp/, /fadeIn/, /fadeInDown/],
        greedy: [/owl/, /ng-star/, /row/, /container/, /col/, /slideInUp/, /fadeIn/, /fadeInDown/],
      }
    }),
    /* new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.png$|\.webp$|\.ttf$|\.wof2$|\.eot$|\.ttf$|\.ico|\.txt$|[path].ttf$|[path].webp|[path].js$/,
      threshold: 0,
      minRatio: Number.MAX_SAFE_INTEGER,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.js$|\.css$|\.html$|\.png$|\.webp$|\.ttf$|\.wof2$|\.eot$|\.ttf$|\.ico|\.txt$|[path]\.ttf$|[path]\.webp|[path]\.js$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 0,
      minRatio: Number.MAX_SAFE_INTEGER,
    }), */
  ],
};
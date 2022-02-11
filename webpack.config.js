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
      }, 
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[fullhash].[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.appSrc}/**/*`, { nodir: true }),
    }),
    new CompressionPlugin({
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
    }),
  ],
};
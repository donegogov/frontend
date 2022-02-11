const zlib = require("zlib");
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const path = require("path");
const DeadCodePlugin = require('webpack-deadcode-plugin');

module.exports = {
    mode: 'production',
    resolve: {
      extensions: ['[path]/**/*.*'],
    },
    output: {
      //Add hash only in production environment
      filename: "[name].[contenthash].bundle.js"
    },
    optimization: {
        minimizer: [
        new CssMinimizerPlugin({
          parallel: 4,
        }),
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
    module: {
      rules: [
        {
          test: /\.module\.(scss|sass)$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin. Loader, // production environment only
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  externalsplugins: [["postcss-preset-env"]],
                },
              },
            },
            {
              loader: "thread-loader",
              options: {
                workerParallelJobs: 2,
              },
            },
            "sass-loader",
          ].filter(Boolean),
        },
      ],
    },
};
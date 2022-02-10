const zlib = require("zlib");
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    loader: {
          test: /\.s|css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
    },
    optimization: {
        concatenateModules: true,
        mangleWasmImports: true,
        mergeDuplicateChunks: true,
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.js$|\.css$|\.html$|\.wof2$|\.ico|[path]\.js$/,
        })],
        nodeEnv: 'production',
        portableRecords: true,
        providedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        sideEffects: true,
        usedExports: true,
      },
  plugins: [
      new MiniCssExtractPlugin({ filename: "[name].[fullhash].css" }),
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
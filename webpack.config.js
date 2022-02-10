const zlib = require("zlib");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
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

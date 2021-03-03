const path = require('path');

module.exports = {
  entry: './source/js/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /leaflet\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        issuer: /leaflet\.css$/i,
        type: 'asset/resource',
        generator: {
          filename: 'vendors/leaflet/images/[hash][ext]'
        }
      }
    ]
  },
  devtool: 'source-map'
};

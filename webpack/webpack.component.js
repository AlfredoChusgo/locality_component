const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, '..', './src/component.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'bundle.js',
    library: 'LocalidadComponent', // This will be the global variable name
    libraryTarget: 'umd', // Universal Module Definition
    umdNamedDefine: true // Enables named AMD modules in UMD
  },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, '..', './src/index.html'),
//     }),
//   ],
  stats: 'errors-only',
}
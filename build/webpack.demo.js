/**
 * Webpack config to see if css file works on demo page
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = {
  mode: 'production',
  entry: './demo/deploymentIndex.js',
  output: {
    path: path.resolve(process.cwd()),
    publicPath: '/',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.entry'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8087,
    publicPath: '/',
    hot: false,
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: config.docLoaders('production')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.tpl',
      favicon: './demo/assets/images/naivelogo.svg'
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    })
  ]
}

module.exports = webpackConfig

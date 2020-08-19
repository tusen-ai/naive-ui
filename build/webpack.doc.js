/**
 * Webpack config to pack documentation page
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = {
  mode: 'production',
  entry: './demo/deployment-index.js',
  output: {
    path: path.resolve(__dirname, '..', 'build-doc', 'dist'),
    publicPath: '/',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  resolve: config.resolve,
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

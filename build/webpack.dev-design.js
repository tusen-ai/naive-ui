/**
 * Webpack config under development
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const webpackConfig = {
  mode: 'development',
  entry: './demo/dev-design-index',
  output: {
    path: path.resolve(process.cwd()),
    publicPath: '/',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  resolve: config.resolve,
  devServer: {
    host: '0.0.0.0',
    port: 8086,
    publicPath: '/',
    hot: true,
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: config.docLoaders()
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
    })
  ]
}

module.exports = webpackConfig

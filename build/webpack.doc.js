/**
 * Webpack config to pack documentation page
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = {
  mode: 'development',
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'doc', 'dist'),
    publicPath: '',
    filename: '[name].[hash:7].js',
    chunkFilename: '[name].[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /index\.md$/,
        loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDocLoader.js')]
      },
      {
        test: {
          test: /\.md$/,
          exclude: /index\.md$/
        },
        loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDemoLoader.js')]
      },
      {
        test: /\.demo\.vue$/,
        loader: ['vue-loader', path.resolve(__dirname, '../doc/NaiveUIDemoLoader.js')]
      },
      {
        test: {
          test: /\.vue$/,
          exclude: /\.demo\.vue$/
        },
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.tpl',
      filename: './index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }),
    new ExtractTextPlugin('[name].[hash:7].css')
  ]
}

module.exports = webpackConfig

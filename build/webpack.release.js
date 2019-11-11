/**
 * Webpack config to test if there is any problem in index.js before release
 */
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require('glob')

const entry = {}
glob.sync('./packages/icons/*.vue').concat('./index.js').forEach(filePath => {
  const entryName = filePath.replace(/^\.\/packages\//, '').replace(/\.(vue|js)$/, '')
  entry[entryName] = filePath
})

const webpackConfig = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(process.cwd(), 'lib'),
    // publicPath: '',
    filename: '[name].js'
    // chunkFilename: '[name].js'
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
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

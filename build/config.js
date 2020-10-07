const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')

exports.alias = {
  'naive-ui/lib/icons': path.resolve(__dirname, '../src/_icons'),
  'naive-ui': path.resolve(__dirname, '../src/index.js'),
  'src': path.resolve(__dirname, '../src')
}

exports.resolve = {
  extensions: ['.js', '.vue', '.json', '.entry', '.demo-entry.md', '.demo.md', '.md'],
  alias: exports.alias,
  modules: ['node_modules']
}

exports.docLoaders = (env) => [
  {
    test: /index\.entry$/,
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDocEntryLoader.js')]
  },
  {
    test: /\.demo\.md$/,
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDemoLoader.js')]
  },
  {
    test: /\.demo-entry\.md$/,
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDocLoader.js')]
  },
  // TODO: update loader test
  {
    test: {
      test: /\.md$/,
      exclude: [/\.demo-entry\.md$/, /\.demo\.md$/]
    },
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIMdLoader.js')]
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      compilerOptions: {
        whitespace: 'condense'
      }
    }
  },
  {
    test: /\.(js|jsx)$/,
    exclude: [/node_modules/],
    loader: 'babel-loader',
    options: {
      plugins: ['@babel/plugin-syntax-dynamic-import']
    }
  },
  {
    test: /\.(scss|css)$/,
    use: [...(env === 'production' ? [MiniCssExtractPlugin.loader] : []), ...(env === 'production' ? [] : ['style-loader']), 'css-loader', 'postcss-loader', 'sass-loader']
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

exports.plugins = [
  new DefinePlugin({
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  })
]

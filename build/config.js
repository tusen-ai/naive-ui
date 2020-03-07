const path = require('path')

exports.alias = {
  'naive-ui/lib/icons': path.resolve(__dirname, '../src/_icons'),
  'src': path.resolve(__dirname, '../src')
}

exports.docLoaders = [
  {
    test: /index.entry$/,
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDocEntryLoader.js')]
  },
  {
    test: /index\.md$/,
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDocLoader.js')]
  },
  {
    test: /(README\.md$|\.vue\.md$)/,
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIMdLoader.js')]
  },
  {
    test: {
      test: /\.md$/,
      exclude: [/index\.md$/, /README\.md$/, /\.vue\.md$/]
    },
    loader: ['vue-loader', path.resolve(__dirname, '../demo/loaders/NaiveUIDemoLoader.js')]
  },
  {
    test: {
      test: /\.vue$/
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
    loader: 'babel-loader',
    options: {
      plugins: ['@babel/plugin-syntax-dynamic-import']
    }
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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

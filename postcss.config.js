module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          normalizeWhitespace: false,
          colormin: false
        }
      ]
    })
  ]
}

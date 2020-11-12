// this file is used by vite, keep it here
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

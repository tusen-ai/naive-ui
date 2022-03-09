module.exports = {
  plugins: [
    [
      'babel-plugin-custom-import-path-transform',
      {
        transformImportPath: './scripts/transform-es-import-path.js'
      }
    ]
  ]
}

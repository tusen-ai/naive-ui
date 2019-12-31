const sass = require('node-sass')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssConfig = require('../postcss.config')

const styleFiles = fs
  .readdirSync(path.resolve(__dirname, '../styles'))
  .filter(fileName => fileName.endsWith('.scss'))

styleFiles.forEach(fileName => {
  sass.render({
    file: path.resolve(__dirname, '../styles', fileName),
    outputStyle: 'expanded'
  }, function (err, sassResult) {
    if (err) console.error(err)
    postcss(postcssConfig.plugins)
      .process(sassResult.css, {
        from: undefined
      })
      .then(result => {
        fs.writeFile(
          path.resolve(__dirname, '../lib/styles', fileName.replace(/\.scss/, '.css')),
          result.css,
          err => {
            if (err) console.error(err)
          }
        )
      })
  })
})

const sass = require('node-sass')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssConfig = require('../postcss.config')
const ncp = require('ncp')

const styleFiles = fs
  .readdirSync(path.resolve(__dirname, '../src/_styles'))
  .filter(fileName => fileName.endsWith('.scss'))

function createDirIfNotExists (...args) {
  if (!fs.existsSync(path.resolve(...args))) {
    fs.mkdirSync(path.resolve(...args))
  }
}

createDirIfNotExists(__dirname, '../lib')
createDirIfNotExists(__dirname, '../lib', 'styles')
createDirIfNotExists(__dirname, '../lib', 'styles', 'resources')
createDirIfNotExists(__dirname, '../es')
createDirIfNotExists(__dirname, '../es', 'styles')
createDirIfNotExists(__dirname, '../es', 'styles', 'resources')

styleFiles.forEach(fileName => {
  sass.render({
    file: path.resolve(__dirname, '../src/_styles', fileName),
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
        fs.writeFile(
          path.resolve(__dirname, '../es/styles', fileName.replace(/\.scss/, '.css')),
          result.css,
          err => {
            if (err) console.error(err)
          }
        )
      })
  })
})

ncp(
  path.resolve(__dirname, '../src/_styles/resources'),
  path.resolve(__dirname, '../lib/styles/resources')
)

ncp(
  path.resolve(__dirname, '../src/_styles/resources'),
  path.resolve(__dirname, '../es/styles/resources')
)

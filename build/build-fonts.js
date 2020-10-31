const sass = require('node-sass')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssConfig = require('../postcss.config')
const ncp = require('ncp')

const fontStyleFiles = fs
  .readdirSync(path.resolve(__dirname, '../src/fonts'))
  .filter(fileName => fileName.endsWith('.scss'))

function createDirIfNotExists (...args) {
  if (!fs.existsSync(path.resolve(...args))) {
    fs.mkdirSync(path.resolve(...args))
  }
}

createDirIfNotExists(__dirname, '../fonts')

function createStyleGenerator (
  srcPath,
  targetPath
) {
  return fileName => {
    sass.render({
      file: path.resolve(__dirname, '..', srcPath, fileName),
      outputStyle: 'expanded'
    }, function (err, sassResult) {
      if (err) console.error(err)
      postcss(postcssConfig.plugins)
        .process(sassResult.css, {
          from: undefined
        })
        .then(result => {
          fs.writeFile(
            path.resolve(__dirname, '..', targetPath, fileName.replace(/\.scss/, '.css')),
            result.css,
            err => {
              if (err) console.error(err)
            }
          )
        })
    })
  }
}

fontStyleFiles.forEach(createStyleGenerator('src/fonts', 'fonts'))

ncp(
  path.resolve(__dirname, '../src/fonts/assets'),
  path.resolve(__dirname, '../fonts/assets')
)

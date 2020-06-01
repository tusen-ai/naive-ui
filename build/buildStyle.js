const sass = require('node-sass')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssConfig = require('../postcss.config')
const ncp = require('ncp')

const styleFiles = fs
  .readdirSync(path.resolve(__dirname, '../src/_styles'))
  .filter(fileName => fileName.endsWith('.scss'))

const fontStyleFiles = fs
  .readdirSync(path.resolve(__dirname, '../src/_styles/fonts'))
  .filter(fileName => {
    return ['Lato.scss', 'FiraSans.scss', 'FiraCode.scss'].includes(fileName)
  })

function createDirIfNotExists (...args) {
  if (!fs.existsSync(path.resolve(...args))) {
    fs.mkdirSync(path.resolve(...args))
  }
}

createDirIfNotExists(__dirname, '../lib')
createDirIfNotExists(__dirname, '../lib', 'styles')
createDirIfNotExists(__dirname, '../lib', 'styles', 'fonts')
createDirIfNotExists(__dirname, '../lib', 'styles', 'resources')
createDirIfNotExists(__dirname, '../es')
createDirIfNotExists(__dirname, '../es', 'styles')
createDirIfNotExists(__dirname, '../es', 'styles', 'fonts')
createDirIfNotExists(__dirname, '../es', 'styles', 'resources')

function createStyleGenerator (
  srcPath,
  targetPath
) {
  return fileName => {
    sass.render({
      file: path.resolve(__dirname, '../src/' + srcPath, fileName),
      outputStyle: 'expanded'
    }, function (err, sassResult) {
      if (err) console.error(err)
      postcss(postcssConfig.plugins)
        .process(sassResult.css, {
          from: undefined
        })
        .then(result => {
          fs.writeFile(
            path.resolve(__dirname, '../lib/' + targetPath, fileName.replace(/\.scss/, '.css')),
            result.css,
            err => {
              if (err) console.error(err)
            }
          )
          fs.writeFile(
            path.resolve(__dirname, '../es/' + targetPath, fileName.replace(/\.scss/, '.css')),
            result.css,
            err => {
              if (err) console.error(err)
            }
          )
        })
    })
  }
}

styleFiles.forEach(createStyleGenerator('_styles', 'styles'))
fontStyleFiles.forEach(createStyleGenerator('_styles/fonts', 'styles/fonts'))

ncp(
  path.resolve(__dirname, '../src/_styles/resources'),
  path.resolve(__dirname, '../lib/styles/resources')
)

ncp(
  path.resolve(__dirname, '../src/_styles/resources'),
  path.resolve(__dirname, '../es/styles/resources')
)

const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const { plugins, external } = require('../rollup.config')
const camelCase = require('lodash/camelCase')

const iconPath = path.resolve(__dirname, '..', 'src', '_icons')
const iconNames = fs.readdirSync(iconPath).filter(name => name.endsWith('.vue'))

const iconIndex =
  `/** Never import this file! It is automatically generated for building icons fast */\n\n` +
  iconNames.map((iconName) => `import ${camelCase(iconName.match(/.*(?=.vue)/)[0])} from './${iconName}'`).join('\n') +
  '\n\nexport default {\n' +
  iconNames.map((iconName) => `  ${camelCase(iconName.match(/.*(?=.vue)/)[0])},`).join('\n') +
  '\n}'

const iconIndexPath = path.resolve(iconPath, 'index.js')

fs.writeFileSync(
  iconIndexPath,
  iconIndex
)

const cjsIconPath = path.resolve(__dirname, '..', 'lib', 'icons')
const esmIconPath = path.resolve(__dirname, '..', 'es', 'icons')

function createDirIfNotExists (...args) {
  if (!fs.existsSync(path.resolve(...args))) {
    fs.mkdirSync(path.resolve(...args))
  }
}

createDirIfNotExists(__dirname, '../lib')
createDirIfNotExists(__dirname, '../lib', 'icons')
createDirIfNotExists(__dirname, '../es')
createDirIfNotExists(__dirname, '../es', 'icons')

;(async () => {
  const bundle = await rollup
    .rollup({
      input: path.resolve(iconPath),
      preserveModules: true,
      plugins,
      external
    })
  const vueExtRegex = /\.vue\.js/g
  const cjsOutputOptions = {
    format: 'cjs',
    dir: cjsIconPath
  }
  const esmOutputOptions = {
    format: 'esm',
    dir: esmIconPath
  }
  const { output: cjsOutput } = await bundle.generate(cjsOutputOptions)
  cjsOutput.forEach((file, index) => {
    const code = file.code.replace(vueExtRegex, '.js')
    const fileName = file.fileName.replace(vueExtRegex, '.js')
    fs.writeFile(
      path.resolve(cjsIconPath, fileName),
      code,
      (err) => {
        if (err) {
          console.log(err)
        }
      }
    )
  })
  const { output: esmOutput } = await bundle.generate(esmOutputOptions)
  esmOutput.forEach((file, index) => {
    const code = file.code.replace(vueExtRegex, '.js')
    const fileName = file.fileName.replace(vueExtRegex, '.js')
    fs.writeFile(
      path.resolve(esmIconPath, fileName),
      code,
      (err) => {
        if (err) {
          console.log(err)
        }
      }
    )
  })
})()

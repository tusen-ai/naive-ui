// build icon is deprecated
// it is kept for backward compitability
// it will be removed in next major version
// warning info should be added
// using `vicons` is a recommend way for users to use icons

const fs = require('fs-extra')
const path = require('path')

const iconPath = path.resolve(__dirname, '../..', 'compat', 'icons')

const cjsIconPath = path.resolve(__dirname, '../..', 'lib', 'icons')
const esmIconPath = path.resolve(__dirname, '../..', 'es', 'icons')

function createDirIfNotExists (...args) {
  if (!fs.existsSync(path.resolve(...args))) {
    fs.mkdirSync(path.resolve(...args))
  }
}

createDirIfNotExists(__dirname, '../../lib')
fs.copySync(iconPath, cjsIconPath)
createDirIfNotExists(__dirname, '../../es')
fs.copySync(iconPath, esmIconPath)

const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]

const componentPath = path.resolve(__dirname, '..', 'src', componentName)

if (!fs.existsSync(componentPath)) {
  console.log(componentPath + ' doesn\'t exists')
  process.exit(1)
}

const themeStylesPath = path.resolve(componentPath, 'styles')
if (!fs.existsSync(themeStylesPath)) {
  fs.mkdirSync(themeStylesPath)
}
fs.writeFileSync(path.resolve(themeStylesPath, 'light.js'), `import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: '',
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
`)
fs.writeFileSync(path.resolve(themeStylesPath, 'dark.js'), `import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: '',
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})
`)

const cssrPath = path.resolve(componentPath, 'src', 'styles')
if (!fs.existsSync(cssrPath)) {
  fs.mkdirSync(cssrPath)
}

fs.writeFileSync(path.resolve(cssrPath, 'themed-base.cssr.js'), `import { c, cTB, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
  }
])
`)

fs.writeFileSync(path.resolve(cssrPath, 'index.js'), `import themedBaseStyle from './themed-base.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: [
      'mergedTheme'
    ],
    CNode: themedBaseStyle
  }
]
`)

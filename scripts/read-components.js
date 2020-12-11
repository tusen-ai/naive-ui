const fs = require('fs').promises
const path = require('path')
const _ = require('lodash')

;(async () => {
  const files = await fs.readdir(
    path.resolve(__dirname, '..', 'src')
  )
  for (const file of files) {
    if ([
      'locales'
    ].includes(file)) continue
    if (!file.startsWith('_') && !file.endsWith('.js')) {
      console.log(`- [ ] ${file}`)
      await generateImportOnDemandTest(file)
    }
  }
})()

async function generateImportOnDemandTest (name) {
  const styleVarName = `${_.camelCase(name)}Light`
  const testFileName = `${_.upperFirst(_.camelCase(name))}.spec.js`
  const compVarName = `N${_.upperFirst(_.camelCase(name))}`
  const script = `import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { ${styleVarName} } from '../styles'
import { ${compVarName} } from '../index'

describe('n-${name}', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      ${styleVarName}
    ]
  })
  it('should work with import on demand', () => {
    mount(${compVarName}, {
      global: {
        plugins: [naive]
      }
    })
  })
})
`
  if (
    await fs.stat(path.resolve(__dirname, '../src/', name, 'tests')).then(() => true).catch(() => false)
  ) {
  } else {
    await fs.mkdir(path.resolve(__dirname, '../src/', name, 'tests'))
  }
  await fs.writeFile(path.resolve(__dirname, '../src/', name, 'tests', testFileName), script)
}

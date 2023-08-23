const path = require('path')
const fg = require('fast-glob')
const fs = require('fs-extra')

async function listComponents () {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: path.join(__dirname, '../src'),
    ignore: ['_*', 'dist', 'node_modules']
  })
  files.sort()
  return files
}

async function updateComponentsList () {
  const componentList = await listComponents()
  fs.writeJSON(path.join(__dirname, '../components.meta.json'), componentList, {
    spaces: 2
  })
}
updateComponentsList()

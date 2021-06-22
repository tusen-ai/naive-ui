const fs = require('fs')

function getPackages (context) {
  const ctx = context || {}
  const cwd = ctx.cwd || process.cwd()
  const pkgs = []
  const dir = cwd + '/src'
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    if (!file.startsWith('_')) {
      const states = fs.statSync(dir + '/' + file)
      if (states.isDirectory()) {
        pkgs.push(file)
      }
    }
  })
  return pkgs
}

const scopes = ['core', 'style', 'docs', 'dev', 'util', 'store', 'suspense']

function getScopes (context) {
  return [...getPackages(context), ...scopes]
}

function getTypes () {
  return [
    'feat',
    'fix',
    'docs',
    'style',
    'refactor',
    'perf',
    'test',
    'ci',
    'chore',
    'revert'
  ]
}

module.exports.getPackages = getPackages
module.exports.getScopes = getScopes
module.exports.getTypes = getTypes

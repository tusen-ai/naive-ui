'use strict'

const { execSync } = require('child_process')
const fg = require('fast-glob')

const components = fg
  .sync('*', { cwd: 'src', onlyDirectories: true })
  .map((name) => name.replace(/^_/, ''))

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  '))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/^_/, '')

/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  scopes: ['build', 'demo', 'playground', 'script', ...components],
  customScopesAlign: !scopeComplete ? 'top' : 'bottom',
  defaultScope: scopeComplete,
  maxHeaderLength: 100,
  allowEmptyIssuePrefixs: false,
  allowCustomIssuePrefixs: false
}

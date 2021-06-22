const { getTypes, getScopes } = require('./build/utils/commit-util')

// https://commitlint.js.org/#/reference-rules
module.exports = {
  rules: {
    'type-enum': [2, 'always', getTypes()],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-enum': [2, 'always', getScopes()],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-min-length': [2, 'always', 3],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always']
  }
}

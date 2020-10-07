import themedBaseStyle from './themed-header.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: [
      'mergedTheme'
    ],
    CNode: themedBaseStyle
  }
]

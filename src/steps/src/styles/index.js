import themedBaseStyle from './steps/themed-base.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: ['mergedTheme'],
    CNode: themedBaseStyle
  }
]

import themedBaseStyle from './themed-base/index.cssr.js'
import themedSizeStyle from './themed-size.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: ['mergedTheme'],
    CNode: themedBaseStyle
  },
  {
    key: 'mergedSize',
    watch: ['mergedSize', 'mergedTheme'],
    CNode: themedSizeStyle
  }
]

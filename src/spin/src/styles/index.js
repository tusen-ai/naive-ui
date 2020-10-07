import baseStyle from './themed-base.cssr.js'
import sizeStyle from './themed-size.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: ['mergedTheme'],
    CNode: baseStyle
  },
  {
    key: 'size',
    watch: ['size'],
    CNode: sizeStyle
  }
]

import sizeStyle from './themed-size.cssr.js'
import baseStyle from './themed-base.cssr.js'

export default [
  {
    key: 'size',
    watch: [
      'mergedTheme',
      'size'
    ],
    CNode: sizeStyle
  },
  {
    key: 'mergedTheme',
    watch: [
      'mergedTheme'
    ],
    CNode: baseStyle
  }
]

import sizeStyle from './themed-size.cssr.js'
import baseStyle from './themed-base.cssr.js'

export default [
  {
    key: 'mergedSize',
    watch: [
      'mergedSize',
      'mergedTheme'
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

import colorStyle from './themed-color.cssr.js'
import sizeStyle from './themed-size.cssr.js'
import baseStyle from './themed-base.cssr.js'

export default [
  {
    key: 'type',
    watch: [
      'type',
      'mergedTheme'
    ],
    CNode: colorStyle
  },
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

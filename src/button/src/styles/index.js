import colorStyle from './color.cssr.js'
import sizeStyle from './size.cssr.js'
import baseStyle from './base.cssr.js'

export default [
  {
    key: 'type',
    watch: [
      'type',
      'syntheticTheme'
    ],
    CNode: colorStyle
  },
  {
    key: 'size',
    watch: [
      'size',
      'syntheticTheme'
    ],
    CNode: sizeStyle
  },
  {
    key: 'syntheticTheme',
    watch: [
      'syntheticTheme'
    ],
    CNode: baseStyle
  }
]

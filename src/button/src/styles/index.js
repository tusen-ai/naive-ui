import colorStyle from './themed-color.cssr.js'
import sizeStyle from './themed-size.cssr.js'
import baseStyle from './themed-base.cssr.js'

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
    key: 'syntheticSize',
    watch: [
      'syntheticSize',
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

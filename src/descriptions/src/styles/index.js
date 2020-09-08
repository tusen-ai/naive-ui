import sizeStyle from './themed-size.cssr.js'
import baseStyle from './themed-base.cssr.js'

export default [
  {
    key: 'size',
    watch: [
      'syntheticTheme',
      'size'
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

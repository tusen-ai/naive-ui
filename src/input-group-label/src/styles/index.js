import baseStyle from './themed-base.cssr.js'
import sizeStyle from './themed-size.cssr.js'

export default [
  {
    key: 'syntheticTheme',
    watch: ['syntheticTheme'],
    CNode: baseStyle
  },
  {
    key: 'size',
    watch: ['syntheticTheme', 'size'],
    CNode: sizeStyle
  }
]

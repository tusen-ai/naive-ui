import baseStyle from './themed-base.cssr.js'
import sizeStyle from './themed-size.cssr.js'

export default [
  {
    key: 'syntheticSize',
    watch: ['syntheticSize'],
    CNode: baseStyle
  },
  {
    key: 'syntheticSize',
    watch: ['syntheticSize', 'syntheticTheme'],
    CNode: sizeStyle
  }
]

import baseStyle from './themed-base.cssr.js'
import typeStyle from './themed-type.cssr.js'

export default [
  {
    key: 'syntheticTheme',
    watch: ['syntheticTheme'],
    CNode: baseStyle
  },
  {
    key: 'status',
    watch: ['status', 'syntheticTheme'],
    CNode: typeStyle
  }
]

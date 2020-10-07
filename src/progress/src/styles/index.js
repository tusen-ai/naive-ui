import baseStyle from './themed-base.cssr.js'
import typeStyle from './themed-type.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: ['mergedTheme'],
    CNode: baseStyle
  },
  {
    key: 'status',
    watch: ['status', 'mergedTheme'],
    CNode: typeStyle
  }
]

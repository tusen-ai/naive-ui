import baseStyle from './themed-base.cssr.js'
import colorStyle from './themed-color.cssr.js'

export default [
  {
    key: 'syntheticTheme',
    CNode: baseStyle,
    watch: [
      'syntheticTheme'
    ]
  },
  {
    key: 'type',
    CNode: colorStyle,
    watch: [
      'type',
      'syntheticTheme'
    ]
  }
]

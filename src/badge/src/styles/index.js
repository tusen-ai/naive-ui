import baseStyle from './themed-base.cssr.js'
import colorStyle from './themed-color.cssr.js'

export default [
  {
    key: 'mergedTheme',
    CNode: baseStyle,
    watch: [
      'mergedTheme'
    ]
  },
  {
    key: 'type',
    CNode: colorStyle,
    watch: [
      'type',
      'mergedTheme'
    ]
  }
]

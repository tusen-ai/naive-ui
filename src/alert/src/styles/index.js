import themedBaseStyle from './themed-base.cssr.js'
import themedTypeStyle from './themed-type.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: [
      'mergedTheme'
    ],
    CNode: themedBaseStyle
  },
  {
    key: 'type',
    watch: [
      'type',
      'mergedTheme'
    ],
    CNode: themedTypeStyle
  }
]

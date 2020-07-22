import themedBaseStyle from './themed-base.cssr.js'
import themedTypeStyle from './themed-type.cssr.js'

export default [
  {
    key: 'syntheticTheme',
    watch: [
      'syntheticTheme'
    ],
    CNode: themedBaseStyle
  },
  {
    key: 'type',
    watch: [
      'type',
      'syntheticTheme'
    ],
    CNode: themedTypeStyle
  }
]

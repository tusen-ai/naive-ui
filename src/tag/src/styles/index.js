import themedBaseStyle from './themed-base.cssr.js'
import themedSizeStyle from './themed-size.cssr.js'
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
    key: 'size',
    watch: [
      'syntheticTheme',
      'size'
    ],
    CNode: themedSizeStyle
  },
  {
    key: 'type',
    watch: [
      'syntheticTheme',
      'type'
    ],
    CNode: themedTypeStyle
  }
]

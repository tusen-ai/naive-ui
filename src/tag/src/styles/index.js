import themedBaseStyle from './themed-base.cssr.js'
import themedSizeStyle from './themed-size.cssr.js'
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
    key: 'size',
    watch: [
      'mergedTheme',
      'size'
    ],
    CNode: themedSizeStyle
  },
  {
    key: 'type',
    watch: [
      'mergedTheme',
      'type'
    ],
    CNode: themedTypeStyle
  }
]

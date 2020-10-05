import themedBaseStyle from './themed-base/index.cssr.js'
import themedSizeStyle from './themed-size.cssr.js'

export default [
  {
    key: 'syntheticTheme',
    watch: [
      'syntheticTheme'
    ],
    CNode: themedBaseStyle
  },
  {
    key: 'mergedSize',
    watch: [
      'mergedSize',
      'syntheticTheme'
    ],
    CNode: themedSizeStyle
  }
]

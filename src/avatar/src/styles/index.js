import themedBaseStyle from './themed-base.cssr.js'
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
    key: 'size',
    watch: [
      'syntheticTheme',
      'size'
    ],
    CNode: themedSizeStyle
  }
]

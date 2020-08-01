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
    key: 'syntheticSize',
    watch: [
      'syntheticSize'
    ],
    CNode: themedSizeStyle
  }
]

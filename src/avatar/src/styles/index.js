import themedBaseStyle from './themed-base.cssr.js'
import themedSizeStyle from './themed-size.cssr.js'

export default [
  {
    key: 'mergedTheme',
    watch: [
      'mergedTheme'
    ],
    CNode: themedBaseStyle
  },
  {
    key: 'cssrSize',
    watch: [
      'mergedTheme',
      'cssrSize'
    ],
    CNode: themedSizeStyle
  }
]

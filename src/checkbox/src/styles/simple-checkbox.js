import sizeStyle from './themed-size.cssr.js'
import baseStyle from './themed-base.cssr.js'

export default [
  {
    key: 'size',
    watch: [
      'size',
      'theme'
    ],
    CNode: sizeStyle
  },
  {
    key: 'theme',
    watch: [
      'theme'
    ],
    CNode: baseStyle
  }
]

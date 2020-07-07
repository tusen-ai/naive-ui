import baseStyle from './themed-base.js'
import sizeStyle from './themed-size'

export default [
  {
    key: 'theme',
    watch: [
      'theme'
    ],
    CNode: baseStyle
  },
  {
    key: 'size',
    watch: [
      'size', 'theme'
    ],
    CNode: sizeStyle
  }
]

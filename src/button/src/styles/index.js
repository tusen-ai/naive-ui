import colorStyle from './color.cssr.js'
import sizeStyle from './size.cssr.js'
// import typeStyle from './type.cssr.js'
// import syntheticThemeStyle from './syntheticTheme.cssr.js'

export default [
  {
    key: 'type',
    CNode: colorStyle,
    watch: [
      'type',
      'syntheticTheme'
    ]
  },
  {
    key: 'size',
    CNode: sizeStyle,
    watch: [
      'size'
    ]
  }
  // {
  //   key: 'color',
  //   CNode: colorStyle,
  //   watch: [
  //     'color'
  //   ]
  // }
  // syntheticTheme: [
  //   {
  //     CNode: colorStyle
  //   }
  // ]
]

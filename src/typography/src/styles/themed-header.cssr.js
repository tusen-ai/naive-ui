import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    return [1, 2, 3, 4, 5, 6].map(
      level => headerStyle(level, props)
    )
  }
])

function headerStyle (level, props) {
  const {
    easeInOutCubicBezier
  } = props.$base
  const {
    headerTextColor,
    headerFontWeight,
    headerFontSize,
    headerMargin,
    headerPrefixWidth,
    headerBarWidth,
    headerBarColor
  } = props.$local
  return cTB('h' + level, {
    fontSize: headerFontSize[level],
    fontWeight: headerFontWeight,
    margin: headerMargin[level],
    transition: `color .3s ${easeInOutCubicBezier}`,
    color: headerTextColor
  }, [
    c('&:first-child', {
      marginTop: 0
    }),
    cM('prefix-bar', {
      position: 'relative',
      paddingLeft: headerPrefixWidth[level]
    }, [
      cM('align-text', {
        paddingLeft: 0
      }, [
        c('&::before', {
          left: '-' + headerPrefixWidth[level]
        })
      ]),
      c('&::before', {
        content: '""',
        width: headerBarWidth[level],
        borderRadius: '',
        transition: `background-color .3s ${easeInOutCubicBezier}`,
        left: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: ''
      }),
      ...[
        'default',
        'primary',
        'info',
        'success',
        'warning',
        'error'
      ].map(type =>
        cM(type + '-type', [
          c('&::before', {
            backgroundColor: headerBarColor[type]
          })
        ])
      )
    ])
  ])
}

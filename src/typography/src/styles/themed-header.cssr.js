import { c, cTB, cM, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from 'seemly'

export default c([
  ({ props }) => {
    return ['1', '2', '3', '4', '5', '6'].map(
      level => headerStyle(level, props)
    )
  }
])

function headerStyle (level, props) {
  const {
    $local,
    $global: {
      cubicBezierEaseInOut
    }
  } = props
  const {
    headerTextColor,
    headerFontWeight,
    [createKey('headerBarWidth', level)]: barWidth,
    [createKey('headerFontSize', level)]: fontSize,
    [createKey('headerMargin', level)]: margin,
    [createKey('headerPrefixWidth', level)]: prefixWidth
  } = $local
  const barRadius = pxfy(depx(barWidth) / 2)
  return cTB('h' + level, {
    fontSize,
    fontWeight: headerFontWeight,
    margin,
    transition: `color .3s ${cubicBezierEaseInOut}`,
    color: headerTextColor
  }, [
    c('&:first-child', {
      marginTop: 0
    }),
    cM('prefix-bar', {
      position: 'relative',
      paddingLeft: prefixWidth
    }, [
      cM('align-text', {
        paddingLeft: 0
      }, [
        c('&::before', {
          left: '-' + prefixWidth
        })
      ]),
      c('&::before', {
        content: '""',
        width: barWidth,
        borderRadius: barRadius,
        transition: `background-color .3s ${cubicBezierEaseInOut}`,
        left: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
      }),
      [
        'default',
        'primary',
        'info',
        'success',
        'warning',
        'error'
      ].map(type =>
        cM(type + '-type', [
          c('&::before', {
            backgroundColor: $local[createKey('headerBarColor', type)]
          })
        ])
      )
    ])
  ])
}

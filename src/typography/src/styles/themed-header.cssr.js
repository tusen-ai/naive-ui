import { c, cTB, cM, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from '../../../_utils/css'

export default c([
  ({ props }) => {
    return ['1', '2', '3', '4', '5', '6'].map(
      level => headerStyle(level, props)
    )
  }
])

function headerStyle (level, props) {
  const {
    $local
  } = props
  const {
    cubicBezierEaseInOut
  } = props.$base
  const {
    headerTextColor,
    headerFontWeight
  } = $local
  const barWidth = $local[createKey('headerBarWidth', level)]
  const barRadius = pxfy(depx(barWidth) / 2)
  return cTB('h' + level, {
    fontSize: $local[createKey('headerFontSize', level)],
    fontWeight: headerFontWeight,
    margin: $local[createKey('headerMargin', level)],
    transition: `color .3s ${cubicBezierEaseInOut}`,
    color: headerTextColor
  }, [
    c('&:first-child', {
      marginTop: 0
    }),
    cM('prefix-bar', {
      position: 'relative',
      paddingLeft: $local[createKey('headerPrefixWidth', level)]
    }, [
      cM('align-text', {
        paddingLeft: 0
      }, [
        c('&::before', {
          left: '-' + $local[createKey('headerPrefixWidth', level)]
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

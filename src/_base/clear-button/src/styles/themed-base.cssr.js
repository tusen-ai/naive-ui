import { cTB, c, cB, cE } from '../../../../_utils/cssr'
import createIconSwitchTransition from '../../../../_styles/transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local: {
        size,
        color,
        colorHover,
        colorPressed
      }
    } = props
    return cTB('base-clear-button', {
      flexShrink: 0,
      height: '1em',
      width: '1em',
      position: 'relative'
    }, [
      c('>', [
        cE('clear', {
          fontSize: `${size} !important`,
          cursor: 'pointer',
          color,
          transition: `color .3s ${cubicBezierEaseInOut}`
        }, [
          c('&:hover', {
            color: colorHover
          }),
          c('&:active', {
            color: colorPressed
          })
        ]),
        cB('icon', {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%) translateY(-50%)'
        }, [
          createIconSwitchTransition({
            originalTransform: 'translateX(-50%) translateY(-50%)',
            left: '50%',
            top: '50%'
          })
        ])
      ])
    ])
  }
])

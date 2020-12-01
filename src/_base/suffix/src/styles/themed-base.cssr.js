import { cTB, c, cB, cM, insideFormItem, createKey } from '../../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../../_styles/transitions/fade-in-scale-up'
import createIconSwitchTransition from '../../../../_styles/transitions/icon-switch'

function styleInsideFormItem (status, $local) {
  return insideFormItem(status, cTB('base-suffix', [
    cB('base-suffix-cross', [
      c('&:hover', [
        c('svg', {
          color: $local[createKey('crossColorHover', status)]
        })
      ]),
      c('&:active', [
        c('svg', {
          color: $local[createKey('crossColorPressed', status)]
        })
      ])
    ]),
    cB('base-suffix-arrow', [
      cM('active', {
        color: $local[createKey('arrowColorActive', status)]
      })
    ])
  ]))
}

export default c([
  ({ props }) => {
    const {
      $global: {
        transformDebounceScale,
        cubicBezierEaseInOut
      },
      $local: {
        iconSize,
        crossColor,
        crossColorHover,
        crossColorPressed,
        arrowColor,
        arrowColorActive,
        arrowColorDisabled
      }
    } = props
    const iconSwitchTransition = createIconSwitchTransition()
    return [
      cTB('base-suffix', {
        raw: `
          user-select: none;
          display: inline-block;
          position: relative;
          height: ${iconSize};
          width: ${iconSize};
          vertical-align: bottom;
        `
      }, [
        fadeInScaleUpTransition(),
        cB('base-suffix-spin', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            height: ${iconSize};
            width: ${iconSize};
          `
        }, [
          iconSwitchTransition
        ]),
        cB('base-suffix-cross', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            height: ${iconSize};
            width: ${iconSize};
            line-height: ${iconSize};
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
          `
        }, [
          iconSwitchTransition,
          c('svg', {
            transition: `color .3s ${cubicBezierEaseInOut}`,
            color: crossColor
          }),
          c('&:hover', [
            c('svg', {
              color: crossColorHover
            })
          ]),
          c('&:active', [
            c('svg', {
              color: crossColorPressed
            })
          ])
        ]),
        cB('base-suffix-arrow', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            transform: rotate(0);
            width: ${iconSize};
            height: ${iconSize};
            border-radius: 8px;
            overflow: hidden;
            color: ${arrowColor};
            cursor: pointer;
            font-size: ${iconSize};
            line-height: 0;
            transform-origin: 0 0;
            transition: color .3s ${cubicBezierEaseInOut};
          `
        }, [
          iconSwitchTransition,
          c('svg', {
            transition: `transform .3s ${cubicBezierEaseInOut}`,
            width: '1em',
            height: '1em'
          }),
          cM('active', {
            color: arrowColorActive
          }, [
            c('svg', {
              transform: 'rotate(180deg)'
            })
          ]),
          cM('disabled', {
            cursor: 'not-allowed',
            color: arrowColorDisabled
          })
        ])
      ]),
      styleInsideFormItem('warning', props.$local),
      styleInsideFormItem('error', props.$local)
    ]
  }
])

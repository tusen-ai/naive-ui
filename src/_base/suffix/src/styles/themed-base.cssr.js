import { cTB, c, cB, cE, cM, insideFormItem, createKey } from '../../../../_utils/cssr'
import { depx, pxfy } from 'seemly'
import fadeInScaleUpTransition from '../../../../_styles/transitions/fade-in-scale-up'
import createIconSwitchTransition from '../../../../_styles/transitions/icon-switch'

function styleInsideFormItem (status, $local) {
  return insideFormItem(status, cTB('base-suffix', [
    cB('base-suffix-cross', [
      c('&:hover', [
        cE('icon', {
          fill: $local[createKey('crossColorHover', status)]
        })
      ]),
      c('&:active', [
        cE('icon', {
          fill: $local[createKey('crossColorActive', status)]
        })
      ])
    ]),
    cB('base-suffix-arrow', [
      cM('active', [
        c('&::after', {
          borderLeftColor: $local[createKey('arrowColorActive', status)],
          borderBottomColor: $local[createKey('arrowColorActive', status)]
        })
      ])
    ])
  ]))
}

export default c([
  ({ props }) => {
    const {
      $base: {
        transformDebounceScale,
        cubicBezierEaseInOut
      },
      $local: {
        iconSize,
        crossColor,
        crossColorHover,
        crossColorActive,
        arrowSize,
        arrowBorderWidth,
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
          cE('icon', {
            transition: `fill .3s ${cubicBezierEaseInOut}`,
            fill: crossColor
          }),
          c('&:hover', [
            cE('icon', {
              fill: crossColorHover
            })
          ]),
          c('&:active', [
            cE('icon', {
              fill: crossColorActive
            })
          ])
        ]),
        cB('base-suffix-arrow', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: ${iconSize};
            height: ${iconSize};
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
          `
        }, [
          iconSwitchTransition,
          c('&::after', {
            raw: `
              transition:
                transform .3s ${cubicBezierEaseInOut},
                border-color .3s ${cubicBezierEaseInOut};
              position: absolute;
              content: '';
              box-sizing: border-box;
              width: ${arrowSize};
              height: ${arrowSize};
              right: 1px;
              top: calc(50% - ${pxfy(depx(arrowSize) / 2 + depx(arrowBorderWidth))});
              transform: rotate(-45deg);
              transform-origin: 30% 70%;
            `,
            borderLeft: `${arrowBorderWidth} solid ${arrowColor}`,
            borderBottom: `${arrowBorderWidth} solid ${arrowColor}`
          }),
          cM('active', [
            c('&::after', {
              transform: 'rotate(135deg)',
              borderLeft: `${arrowBorderWidth} solid ${arrowColorActive}`,
              borderBottom: `${arrowBorderWidth} solid ${arrowColorActive}`
            })
          ]),
          cM('disabled', {
            cursor: 'not-allowed'
          }, [
            c('&::after', {
              borderLeft: `${arrowBorderWidth} solid ${arrowColorDisabled}`,
              borderBottom: `${arrowBorderWidth} solid ${arrowColorDisabled}`
            })
          ])
        ])
      ]),
      styleInsideFormItem('warning', props.$local),
      styleInsideFormItem('error', props.$local)
    ]
  }
])

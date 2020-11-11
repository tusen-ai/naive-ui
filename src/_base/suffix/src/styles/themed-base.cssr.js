import { cTB, c, cB, cE, cM, insideFormItem } from '../../../../_utils/cssr'
import {
  depx,
  pxfy
} from '../../../../_utils/css'
import fadeInScaleUpTransition from '../../../../_styles/transitions/fade-in-scale-up'
import createIconSwitchTransition from '../../../../_styles/transitions/icon-switch'

function styleInsideFormItem (status, pallete) {
  return insideFormItem(status, cTB('base-suffix', [
    cB('base-suffix-cross', [
      c('&:hover', [
        cE('icon', {
          fill: pallete.hoverCrossColor
        })
      ]),
      c('&:active', [
        cE('icon', {
          fill: pallete.activeCrossColor
        })
      ])
    ]),
    cB('base-suffix-arrow', [
      cM('active', [
        c('&::after', {
          borderLeftColor: pallete.activeArrowColor,
          borderBottomColor: pallete.activeArrowColor
        })
      ])
    ])
  ]))
}

export default c([
  ({ props }) => {
    const base = props.$base
    const iconSwitchTransition = createIconSwitchTransition()
    const transformDebounceScale = base.transformDebounceScale
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
    const local = props.$local
    return [
      cTB('base-suffix', {
        raw: `
          user-select: none;
          display: inline-block;
          position: relative;
          height: ${local.iconSize};
          width: ${local.iconSize};
          vertical-align: bottom;
        `
      }, [
        fadeInScaleUpTransition(),
        cB('base-suffix-spin', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            height: ${local.iconSize};
            width: ${local.iconSize};
          `
        }, [
          iconSwitchTransition
        ]),
        cB('base-suffix-cross', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            height: ${local.iconSize};
            width: ${local.iconSize};
            line-height: ${local.iconSize};
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
          `
        }, [
          iconSwitchTransition,
          cE('icon', {
            transition: `fill .3s ${base.cubicBezierEaseInOut}`,
            fill: local.default.crossColor
          }),
          c('&:hover', [
            cE('icon', {
              fill: local.default.hoverCrossColor
            })
          ]),
          c('&:active', [
            cE('icon', {
              fill: local.default.activeCrossColor
            })
          ])
        ]),
        cB('base-suffix-arrow', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            top: 0;
            left: 0;
            width: ${local.iconSize};
            height: ${local.iconSize};
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
              width: ${local.arrowSize};
              height: ${local.arrowSize};
              right: ${local.arrowRight};
              top: calc(50% - ${pxfy(depx(local.arrowSize) / 2 + depx(local.arrowBorderWidth))});
              transform: rotate(-45deg);
              transform-origin: 30% 70%;
            `,
            borderLeft: `${local.arrowBorderWidth} solid ${local.default.arrowColor}`,
            borderBottom: `${local.arrowBorderWidth} solid ${local.default.arrowColor}`
          }),
          cM('active', [
            c('&::after', {
              transform: 'rotate(135deg)',
              borderLeft: `${local.arrowBorderWidth} solid ${local.default.activeArrowColor}`,
              borderBottom: `${local.arrowBorderWidth} solid ${local.default.activeArrowColor}`
            })
          ]),
          cM('disabled', {
            cursor: 'not-allowed'
          }, [
            c('&::after', {
              borderLeft: `${local.arrowBorderWidth} solid ${local.default.disabledArrowColor}`,
              borderBottom: `${local.arrowBorderWidth} solid ${local.default.disabledArrowColor}`
            })
          ])
        ])
      ]),
      styleInsideFormItem('warning', props.$local.warning),
      styleInsideFormItem('error', props.$local.error)
    ]
  }
])

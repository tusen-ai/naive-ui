import { cTB, c, cB, cE, cM, insideFormItem } from '../../../../_utils/cssr'
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
    const pallete = props.$local.default
    return [
      cTB('base-suffix', {
        raw: `
          user-select: none;
          display: inline-block;
          position: relative;
          height: 12px;
          width: 12px;
          vertical-align: bottom;
        `
      }, [
        fadeInScaleUpTransition(),
        cB('base-suffix-spin', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            height: 12px;
            width: 12px;
          `
        }, [
          iconSwitchTransition
        ]),
        cB('base-suffix-cross', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            height: 12px;
            width: 12px;
            line-height: 12px;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
          `
        }, [
          iconSwitchTransition,
          cE('icon', {
            transition: `fill .3s ${base.cubicBezierEaseInOut}`,
            fill: pallete.crossColor
          }),
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
        cB('base-suffix-arrow', {
          transform: transformDebounceScale,
          raw: `
            position: absolute;
            top: 0;
            left: 0;
            width: 12px;
            height: 12px;
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
              width: 7px;
              height: 7px;
              right: 1px;
              top: calc(50% - 4.5px);
              transform: rotate(-45deg);
              transform-origin: 30% 70%;
            `,
            borderLeft: `1px solid ${pallete.arrowColor}`,
            borderBottom: `1px solid ${pallete.arrowColor}`
          }),
          cM('active', [
            c('&::after', {
              transform: 'rotate(135deg)',
              borderLeft: `1px solid ${pallete.activeArrowColor}`,
              borderBottom: `1px solid ${pallete.activeArrowColor}`
            })
          ]),
          cM('disabled', {
            cursor: 'not-allowed'
          }, [
            c('&::after', {
              borderLeft: `1px solid ${pallete.disabledArrowColor}`,
              borderBottom: `1px solid ${pallete.disabledArrowColor}`
            })
          ])
        ])
      ]),
      styleInsideFormItem('warning', props.$local.warning),
      styleInsideFormItem('error', props.$local.error)
    ]
  }
])

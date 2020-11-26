import { c, cE, cM, cTB, cB, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      panelColor,
      itemTextColor,
      itemTextColorActive,
      triggerTextDecorationColor,
      triggerTextDecorationColorActive,
      itemColorHover,
      panelDividerColor,
      panelBoxShadow,
      itemOpacityDisabled,
      borderRadius
    } = props.$local
    const {
      transformDebounceScale,
      cubicBezierEaseInOut
    } = props.$base
    return [
      cTB('time-picker', [
        cM('invalid', [
          c('input', {
            raw: `
              text-decoration: line-through;
              text-decoration-color: ${triggerTextDecorationColor};
            `
          })
        ])
      ]),
      cB('time-picker-panel', {
        raw: `
          outline: none;
          font-size: 12px;
          border-radius: ${borderRadius};
          margin: 4px 0;
          min-width: 104px;
          overflow: hidden;
          transform: ${transformDebounceScale};
          background-color: ${panelColor};
          box-shadow: ${panelBoxShadow};
        `
      }, [
        fadeInScaleUpTransition(),
        cB('time-picker-actions', {
          raw: `
            height: 38px;
            align-items: center;
            display: flex;
            justify-content: space-evenly;
          `
        }, [
          cE('confirm', [
            cM('disabled', {
              raw: `
                cursor: not-allowed;
                opacity: 0.5;
              `
            })
          ])
        ]),
        cB('time-picker-cols', {
          raw: `
            height: 224px;
            display: flex;
            position: relative;
            border-bottom: 1px solid ${panelDividerColor};
          `
        }),
        cB('time-picker-col', {
          raw: `
            flex-grow: 1;
            min-width: 52px;
            height: 224px;
            flex-direction: column;
            transition: box-shadow .3s ${cubicBezierEaseInOut};
          `
        }, [
          cM('transition-disabled', [
            cE('item', {
              raw: `
                transition: none;
              `
            })
          ]),
          cE('item', {
            raw: `
              cursor: pointer;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: 
                color .3s ${cubicBezierEaseInOut},
                background-color .3s ${cubicBezierEaseInOut},
                opacity .3s ${cubicBezierEaseInOut},
                text-decoration-color .3s ${cubicBezierEaseInOut};
              background: transparent;
              text-decoration-color: transparent;
              color: ${itemTextColor};
            `
          }, [
            cNotM('disabled', [
              c('&:hover', {
                raw: `
                  background-color:  ${itemColorHover};
                `
              })
            ]),
            cM('active', {
              raw: `
                background-color: ${itemColorHover};
                color: ${itemTextColorActive};
              `
            }),
            cM('disabled', {
              raw: `
                opacity: ${itemOpacityDisabled};
                cursor: not-allowed;
              `
            })
          ]),
          cM('invalid', [
            cE('item', [
              cM('active', {
                raw: `
                  text-decoration: line-through;
                  text-decoration-color: ${triggerTextDecorationColorActive};
                `
              })
            ])
          ])
        ])
      ])
    ]
  }
])

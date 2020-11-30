import { c, cE, cM, cTB, cB, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      panelColor,
      itemTextColor,
      itemTextColorActive,
      itemTextDecorationColorActive,
      itemColorHover,
      panelDividerColor,
      panelBoxShadow,
      itemOpacityDisabled,
      borderRadius,
      itemFontSize,
      itemWidth,
      itemHeight,
      panelActionPadding
    } = props.$local
    const {
      transformDebounceScale,
      cubicBezierEaseInOut
    } = props.$base
    return [
      cTB('time-picker', [
        cM('invalid', [
          c('input', {
            textDecoration: 'line-through'
          })
        ])
      ]),
      cTB('time-picker-panel', {
        raw: `
          outline: none;
          font-size: ${itemFontSize};
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
            padding: ${panelActionPadding};
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
            height: calc(${itemHeight} * 7);
            display: flex;
            position: relative;
            border-bottom: 1px solid ${panelDividerColor};
          `
        }),
        cB('time-picker-col', {
          raw: `
            flex-grow: 1;
            min-width: ${itemWidth};
            height: calc(${itemHeight} * 7);
            flex-direction: column;
            transition: box-shadow .3s ${cubicBezierEaseInOut};
          `
        }, [
          cM('transition-disabled', [
            cE('item', {
              transition: 'none'
            })
          ]),
          cE('padding', {
            height: `calc(${itemHeight} * 6)`
          }),
          cE('item', {
            raw: `
              cursor: pointer;
              height: ${itemHeight};
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
                backgroundColor: itemColorHover
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
                  text-decoration-color: ${itemTextDecorationColorActive};
                `
              })
            ])
          ])
        ])
      ])
    ]
  }
])

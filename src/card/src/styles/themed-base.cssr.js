import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const {
      color,
      textColor,
      titleTextColor,
      titleFontWeight,
      borderColor,
      actionColor,
      borderRadius,
      closeColor,
      closeColorHover,
      closeColorActive
    } = props.$local
    return cTB(
      'card',
      {
        raw: `
          display: block;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          border-radius: ${borderRadius};
          backgroundColor: ${color};
          color: ${textColor};
        `,
        transition: `
          color .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier},
          border-color .3s ${easeInOutCubicBezier}
        `
      },
      [
        cB('card-cover', {
          raw: `
            overflow: hidden;
            width: 100%;
          `,
          borderRadius: `${borderRadius} ${borderRadius} 0 0`
        },
        [
          c('img', {
            raw: `
              display: block;
              width: 100%;
            `
          })
        ]),
        cM('bordered', {
          border: `1px solid ${borderColor}`
        }),
        cM('action-segmented', [
          c('>', [
            cE('action', [
              c('&:not(:first-child)', {
                borderTop: `1px solid ${borderColor}`
              })
            ])
          ])
        ]),
        cM('content-segmented, content-soft-segmented', [
          c('>', [
            cE('content', {
              transition: `border-color 0.3s ${easeInOutCubicBezier}`
            }, [
              c('&:not(:first-child)', {
                borderTop: `1px solid ${borderColor}`
              })
            ])
          ])
        ]),
        cM('footer-segmented, footer-soft-segmented', [
          c('>', [
            cE('footer', {
              transition: `border-color 0.3s ${easeInOutCubicBezier}`
            }, [
              c('&:not(:first-child)', {
                borderTop: `1px solid ${borderColor}`
              })
            ])
          ])
        ]),
        c('>', [
          cE('content', {
            raw: `
              box-sizing: border-box;
              line-height: 1.75;
              font-size: 14px;
            `
          }),
          cE('footer', {
            raw: `
              box-sizing: border-box;
              line-height: 1.75;
              font-size: 14px;
            `
          })
        ]),
        c('>', [
          cB('card-header', {
            raw: `
              box-sizing: border-box;
              display: flex;
              align-items: center;
            `
          }, [
            cE('main', {
              raw: `
                font-weight: ${titleFontWeight};
                font-size: 18px;
                transition: color .3s ${easeInOutCubicBezier};
                flex: 1;
                color: ${titleTextColor};
              `
            }),
            cE('extra', {
              raw: `
                font-weight: 400;
                font-size: 14px;
                transition: color .3s ${easeInOutCubicBezier};
                color: ${textColor};
              `
            }),
            cE('close-mark', {
              raw: `
                cursor: pointer;
                transition: fill .3s ${easeInOutCubicBezier};
                fill: ${closeColor};
              `
            }, [
              c('&:hover', {
                fill: closeColorHover
              }),
              c('&:active', {
                fill: closeColorActive
              })
            ])
          ]),
          cE('action', {
            raw: `
              box-sizing: border-box;
              transition:
                background-color .3s ${easeInOutCubicBezier},
                border-color .3s ${easeInOutCubicBezier};
              line-height: 1.75;
              font-size: 14px;
              background-clip: padding-box;
              background-color: ${actionColor};
            `
          })
        ])
      ]
    )
  }
])

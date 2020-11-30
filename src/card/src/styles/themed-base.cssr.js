import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$global
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
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
      closeColorPressed
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
          background-color: ${color};
          color: ${textColor};
        `,
        transition: `
          color .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut},
          border-color .3s ${cubicBezierEaseInOut}
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
              transition: `border-color 0.3s ${cubicBezierEaseInOut}`
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
              transition: `border-color 0.3s ${cubicBezierEaseInOut}`
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
                transition: color .3s ${cubicBezierEaseInOut};
                flex: 1;
                color: ${titleTextColor};
              `
            }),
            cE('extra', {
              raw: `
                font-weight: 400;
                font-size: 14px;
                transition: color .3s ${cubicBezierEaseInOut};
                color: ${textColor};
              `
            }),
            cE('close-mark', {
              raw: `
                cursor: pointer;
                transition: color .3s ${cubicBezierEaseInOut};
                color: ${closeColor};
              `
            }, [
              c('&:hover', {
                color: closeColorHover
              }),
              c('&:active', {
                color: closeColorPressed
              })
            ])
          ]),
          cE('action', {
            raw: `
              box-sizing: border-box;
              transition:
                background-color .3s ${cubicBezierEaseInOut},
                border-color .3s ${cubicBezierEaseInOut};
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

import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const {
      cardBackgroundColor,
      cardTextColor,
      cardTitleTextColor,
      cardBorderColor,
      cardActionBackgroundColor,
      cardCloseColor,
      strongFontWeight,
      borderRadius,
      smallBorderRadius
    } = props.$local
    const {
      default: defaultCardCloseColor,
      hover: hoverCardCloseColor,
      active: activeCardCloseColor
    } = cardCloseColor
    return cTB(
      'card',
      {
        raw: `
          display: block;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          border-radius: ${borderRadius};
          backgroundColor: ${cardBackgroundColor};
          color: ${cardTextColor};
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
          borderRadius: `${smallBorderRadius} ${smallBorderRadius} 0 0;`
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
          border: `1px solid ${cardBorderColor}`
        }),
        cM('action-segmented', [
          c('& >', [
            cE('action', [
              c('&:not(:first-child)', {
                borderTop: `1px solid ${cardBorderColor}`
              })
            ])
          ])
        ]),
        cM('content-segmented, content-soft-segmented', [
          c('& >', [
            cE('content', {
              transition: `border-color 0.3s ${easeInOutCubicBezier}`
            }, [
              c('&:not(:first-child)', {
                borderTop: `1px solid ${cardBorderColor}`
              })
            ])
          ])
        ]),
        cM('footer-segmented, footer-soft-segmented', [
          c('& >', [
            cE('footer', {
              transition: `border-color 0.3s ${easeInOutCubicBezier}`
            }, [
              c('&:not(:first-child)', {
                borderTop: `1px solid ${cardBorderColor}`
              })
            ])
          ])
        ]),
        c('& >', [
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
        c('& >', [
          cB('card-header', {
            raw: `
              box-sizing: border-box;
              display: flex;
              align-items: center;
            `
          }, [
            cE('main', {
              raw: `
                font-weight: ${strongFontWeight};
                font-size: 18px;
                transition: color .3s ${easeInOutCubicBezier};
                flex: 1;
                color: ${cardTitleTextColor};
              `
            }),
            cE('extra', {
              raw: `
                font-weight: 400;
                font-size: 14px;
                transition: color .3s ${easeInOutCubicBezier};
                color: ${cardTextColor};
              `
            }),
            cE('close-mark', {
              raw: `
                cursor: pointer;
                transition: fill .3s ${easeInOutCubicBezier};
                fill: ${defaultCardCloseColor};
              `
            }, [
              c('&:hover', {
                fill: hoverCardCloseColor
              }),
              c('&:active', {
                fill: activeCardCloseColor
              })
            ])
          ]),
          cE('action', {
            raw: `
              box-sizing: border-box;
              transition: background-color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
              line-height: 1.75;
              font-size: 14px;
              background-clip: padding-box;
              background-color: ${cardActionBackgroundColor};
            `
          })
        ])
      ]
    )
  }
])

import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../styles/_transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$base
    const {
      dividerColor,
      titleTextColor,
      textColor,
      arrowColor
    } = props.$local
    return [
      cTB(
        'collapse',
        {
          raw: `
            width: 100%;
          `
        },
        [
          cB('collapse-item', {
            raw: `
              overflow: hidden;
              font-size: 14px;
              transition: border-color .3s ${cubicBezierEaseInOut};
              margin-top: 16px;
            `
          },
          [
            c('&:first-child', {
              raw: `
                margin-top: 0;
              `
            }),
            c('&:first-child >', [
              cE('header', {
                raw: `
                  padding-top: 0;
                `
              })
            ]),
            cM('left-arrow-placement', [
              cE('header', [
                cB('collapse-item-arrow', {
                  raw: `
                    margin-right: 4px;
                  `
                })
              ])
            ]),
            cM('right-arrow-placement', [
              cE('header', [
                cB('collapse-item-arrow', {
                  raw: `
                    margin-left: 4px;
                  `
                })
              ])
            ]),
            cB('collapse-item', {
              raw: `
                margin-left: 32px;
              `
            }),
            cE('content-wrapper', {
              raw: `
                overflow: hidden;
              `
            }, [
              fadeInHeightExpandTransition({ duration: '0.15s' })
            ]),
            cM('active', [
              cE('header', [
                cM('active', [
                  cB('collapse-item-arrow', [
                    cB('icon', {
                      raw: `
                        transform: rotate(90deg);
                      `
                    })
                  ])
                ])

              ])
            ]),
            c('&:not(:first-child)', {
              raw: `
                border-top: 1px solid ${dividerColor};
              `
            }),
            cE('header', {
              raw: `
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                transition: color .3s ${cubicBezierEaseInOut};
                position: relative;
                cursor: pointer;
                padding: 16px 0 0 0;
                color: ${titleTextColor};
              `
            }, [
              cB('collapse-item-arrow', {
                raw: `
                  display: flex;
                `
              }, [
                cB('icon', {
                  raw: `
                    transition:
                      transform .15s ${cubicBezierEaseInOut},
                      fill .3s ${cubicBezierEaseInOut},
                      stroke .3s ${cubicBezierEaseInOut};
                    font-size: 16px;
                    fill: ${arrowColor};
                    stroke: ${arrowColor};
                  `
                })
              ])
            ]),
            cE('content-inner', {
              raw: `
                transition: color .3s ${cubicBezierEaseInOut};
                padding-top: 16px;
                color: ${textColor};
              `
            })
          ])
        ]
      )
    ]
  }
])

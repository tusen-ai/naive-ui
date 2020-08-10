import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../styles/_transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const { easeInOutCubicBezier, iconTransition } = props.$base
    const {
      borderColor,
      headerTextColor,
      contentTextColor
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
              transition: border-color .3s ${easeInOutCubicBezier};
              margin-top: 16px;
            `
          },
          [
            c('&:first-child', {
              raw: `
                margin-top: 0px;
              `
            }),
            c('&:first-child >', [
              cE('header', {
                raw: `
                  padding-top: 0px;
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
                border-top: 1px solid ${borderColor};
              `
            }),
            cE('header', {
              raw: `
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                transition: color .3s ${easeInOutCubicBezier};
                position: relative;
                cursor: pointer;
                padding: 16px 0 0 0;
                color: ${headerTextColor};
              `
            }, [
              cB('collapse-item-arrow', {
                raw: `
                  display: flex;
                `
              }, [
                cB('icon', {
                  raw: `
                    transition: transform .15s ${easeInOutCubicBezier}, ${iconTransition};
                    font-size: 16px;
                    fill: ${headerTextColor};
                  `
                })
              ])
            ]),
            cE('content-inner', {
              raw: `
                transition: color .3s ${easeInOutCubicBezier};
                padding-top: 16px;
                color: ${contentTextColor};
              `
            })
          ])
        ]
      )
    ]
  }
])

import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../_styles/transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$global
    const {
      titleFontWeight,
      dividerColor,
      titleTextColor,
      textColor,
      arrowColor,
      fontSize,
      titleFontSize
    } = props.$local
    return [
      cTB(
        'collapse',
        {
          width: '100%'
        },
        [
          cB('collapse-item', {
            raw: `
              overflow: hidden;
              font-size: ${fontSize};
              transition: border-color .3s ${cubicBezierEaseInOut};
              margin-top: 16px;
            `
          },
          [
            c('&:first-child', {
              marginTop: 0
            }),
            c('&:first-child >', [
              cE('header', {
                paddingTop: 0
              })
            ]),
            cM('left-arrow-placement', [
              cE('header', [
                cB('collapse-item-arrow', {
                  marginRight: '4px'
                })
              ])
            ]),
            cM('right-arrow-placement', [
              cE('header', [
                cB('collapse-item-arrow', {
                  marginLeft: '4px'
                })
              ])
            ]),
            cB('collapse-item', {
              marginLeft: '32px'
            }),
            cE('content-wrapper', {
              overflow: 'hidden'
            }, [
              fadeInHeightExpandTransition({ duration: '0.15s' })
            ]),
            cM('active', [
              cE('header', [
                cM('active', [
                  cB('collapse-item-arrow', {
                    transform: 'rotate(90deg)'
                  })
                ])
              ])
            ]),
            c('&:not(:first-child)', {
              borderTop: `1px solid ${dividerColor}`
            }),
            cE('header', {
              raw: `
                font-size: ${titleFontSize};
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                font-weight: ${titleFontWeight};
                transition: color .3s ${cubicBezierEaseInOut};
                position: relative;
                cursor: pointer;
                padding: 16px 0 0 0;
                color: ${titleTextColor};
              `
            }, [
              cB('collapse-item-arrow', {
                display: 'flex',
                transition: `transform .15s ${cubicBezierEaseInOut}`
              }, [
                cB('icon', {
                  raw: `
                    font-size: 18px;
                    color: ${arrowColor};
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

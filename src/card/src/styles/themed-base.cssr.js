import { c, cTB, cB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $local,
      $global: {
        cubicBezierEaseInOut
      }
    } = props
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
      closeColorPressed,
      lineHeight
    } = $local
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
        ['small', 'medium', 'large', 'huge'].map(size => {
          const {
            [createKey('marginBottom', size)]: marginBottom,
            [createKey('marginLeft', size)]: marginLeft,
            [createKey('marginTop', size)]: marginTop,
            [createKey('headerFontSize', size)]: headerFontSize,
            [createKey('fontSize', size)]: fontSize
          } = $local
          return cM(`${size}-size`, {
          }, [
            cM('content-segmented', [
              c('>', [
                cE('content', {
                  paddingTop: marginBottom
                })
              ])
            ]),
            cM('content-soft-segmented', [
              c('>', [
                cE('content', {
                  raw: `
                    margin: 0 ${marginLeft};
                    padding: ${marginBottom} 0;
                  `
                })
              ])
            ]),
            cM('footer-segmented', [
              c('>', [
                cE('footer', {
                  paddingTop: marginBottom
                })
              ])
            ]),
            cM('footer-soft-segmented', [
              c('>', [
                cE('footer', {
                  raw: `
                    padding: ${marginBottom} 0;
                    margin: 0 ${marginLeft};
                  `
                })
              ])
            ]),
            c('>', [
              cB('card-header', {
                padding: `${marginTop} ${marginLeft} ${marginBottom} ${marginLeft}`
              }, [
                cE('main', {
                  fontSize: headerFontSize
                }),
                cE('extra', {
                  fontSize
                })
              ]),
              cE('content, footer', {
                padding: `0 ${marginLeft} ${marginBottom} ${marginLeft}`,
                fontSize
              }, [
                c('&:first-child', {
                  paddingTop: marginBottom
                })
              ]),
              cE('action', {
                raw: `
                  background-color: ${actionColor};
                  padding: ${marginBottom} ${marginLeft};
                  font-size: ${fontSize};
                `
              })
            ])
          ])
        }),
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
              line-height: ${lineHeight};
            `
          }),
          cE('footer', {
            raw: `
              box-sizing: border-box;
              line-height: ${lineHeight};
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
              line-height: ${lineHeight};
              background-clip: padding-box;
              background-color: ${actionColor};
            `
          })
        ])
      ]
    )
  }
])

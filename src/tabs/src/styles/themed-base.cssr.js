import { c, cM, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      labelTextColor,
      labelTextColorActive,
      labelTextColorHover,
      labelTextColorDisabled,
      labelBarColor,
      scrollButtonColor,
      scrollButtonColorDisabled,
      tabCloseColor,
      tabColor,
      tabBorderColorActive,
      tabTextColor,
      tabTextColorActive,
      tabBorderColor,
      paneTextColor,
      tabFontWeight,
      tabBorderRadius
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('tabs', {
      raw: `
        width: 100%;
        transition:
          background-color .3s ${cubicBezierEaseInOut},
          border-color .3s ${cubicBezierEaseInOut};
      `
    }, [
      cM('flex', [
        cB('tabs-nav', [
          cB('tabs-nav-scroll', {
            raw: `
              width: 100%
            `
          }, [
            cB('tabs-label-wrapper', {
              raw: `
                width: 100%;
              `
            }, [
              cB('tabs-label', {
                raw: `
                  margin-right: 0;
                `
              })
            ])
          ])
        ])
      ]),
      cB('tabs-nav', {
        raw: `
          line-height: 1.75;
          display: flex;
          background-clip: padding-box;
          transition: border-color .3s ${cubicBezierEaseInOut};
        `
      }, [
        cB('tabs-nav-scroll', {
          raw: `
            overflow: hidden;
          `
        }),
        cB('tabs-nav-scroll-button', {
          raw: `
            font-size: 20px;
            height: 20px;
            line-height: 20px;
            align-self: center;
            cursor: pointer;
            color: ${scrollButtonColor};
            transition: color .3s ${cubicBezierEaseInOut};
          `
        }, [
          cM('left', {
            marginRight: '8px'
          }),
          cM('right', {
            marginLeft: '8px'
          }),
          cM('disabled', {
            cursor: 'not-allowed',
            color: scrollButtonColorDisabled
          })
        ])
      ]),
      cB('tabs-label-wrapper', {
        raw: `
          display: inline-block;
          font-weight:${tabFontWeight};
          white-space: nowrap;
          position: relative;
        `
      }, [
        cB('tabs-label-bar', {
          raw: `
            position: absolute;
            bottom: 2px;
            height: 2px;
            border-radius: 1px;
            transition:
              left .2s ${cubicBezierEaseInOut},
              max-width .2s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut};
          `,
          backgroundColor: labelBarColor
        }, [
          cM('transition-disabled', {
            transition: 'none'
          })
        ]),
        cB('tabs-label', {
          raw: `
            cursor: pointer;
            white-space: nowrap;
            flex-wrap: nowrap;
            display: inline-flex;
            align-items: center;
            transition:
            background-color .3s ${cubicBezierEaseInOut},
            border-color .3s ${cubicBezierEaseInOut};
          `
        }, [
          cM('disabled', {
            raw: `
              cursor: not-allowed
            `
          }),
          cE('close', {
            raw: `
              margin-left: 8px;
              font-size: 16px;
              line-height: 16px;
              height: 16px;
              cursor: pointer;
              color: ${tabCloseColor};
              transition: color .3s ${cubicBezierEaseInOut};
            `
          }),
          cE('label', {
            raw: `
              transition: color .3s ${cubicBezierEaseInOut};
            `,
            color: labelTextColor
          })
        ])
      ]),
      cB('tab-panel', {
        raw: `
          width: 100%;
          margin-top: 8px;
          transition:
            color .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut};
        `,
        color: paneTextColor
      }),
      cM('line-type', [
        cB('tabs-nav', [
          cB('tabs-nav-scroll-button', {
            raw: `
              padding-bottom: 4px;
            `
          })
        ]),
        cB('tabs-label', {
          raw: `
            box-sizing: border-box;
            padding-bottom: 2px;
            vertical-align: bottom;
          `
        }, [
          cE('label', {
            raw: `
              font-size: 14px;
            `
          }),
          c('&:not(:last-child)', {
            raw: `
             margin-right: 36px;
            `
          }),
          c('&:hover', [
            cE('label', {
              color: labelTextColorHover
            })
          ]),
          cM('active', [
            cE('label', {
              color: labelTextColorActive
            })
          ]),
          cM('disabled', [
            cE('label', {
              color: labelTextColorDisabled
            })
          ])
        ])
      ]),
      cM('card-type', [
        cB('tabs-nav', {
          raw: `
            box-sizing: border-box;
            padding-top: 4px;
            padding-bottom: 4px;
          `,
          borderTop: `1px solid ${tabBorderColor}`,
          borderBottom: `1px solid ${tabBorderColor}`
        }, [
          cB('tabs-nav-scroll-button', [
            cM('left', {
              raw: `
                margin-left: 2px;
                margin-right: 2px;
              `
            }),
            cM('right', {
              raw: `
                margin-left: 2px;
                margin-right: 2px;
              `
            })
          ]),
          cB('tabs-label-bar', {
            raw: `
              bottom: 0;
              border-radius: 0;
            `
          })
        ]),
        cB('tabs-label', {
          raw: `
            margin-right: 4px;
            box-sizing: border-box;
            height: 34px;
            line-height: 34px;
            padding: 0 16px;
            position: relative;
            vertical-align: bottom;
            border-radius: ${tabBorderRadius};
            border: 1px solid transparent;
          `
        }, [
          cE('label', {
            raw: `
              font-size: 14px;
            `,
            color: tabTextColor
          }),
          c('&:hover', {
            backgroundColor: tabColor
          }),
          cM('active', {
            backgroundColor: tabColor,
            border: `1px solid ${tabBorderColorActive}`
          }, [
            cE('label', {
              raw: `
                font-size: 14px;
              `,
              color: tabTextColorActive
            })
          ]),
          cM('disabled', [
            cE('label', {
              color: labelTextColorDisabled
            })
          ])
        ])
      ])
    ])
  }
])

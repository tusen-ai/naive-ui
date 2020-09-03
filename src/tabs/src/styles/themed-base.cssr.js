import { c, cM, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      tabTextColorDefault,
      tabTextColorActive,
      tabTextColorHover,
      tabTextColorDisabled,
      tabBarBackgroundColor,
      tabScrollButtonColorDefault,
      tabScrollButtonColorDisabled,
      tabCloseButtonColorDeault,
      cardTabBackgroundColor,
      cardTabBorderColor,
      cardTabTextColorDefault,
      cardTabTextColorActive,
      navBorderColor,
      panelTextColor,
      strongFontWeight,
      borderRadius
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('tabs', {
      raw: `
        width: 100%;
        transition: background-color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
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
          transition: border-color .3s ${easeInOutCubicBezier};
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
            transition: color .3s ${easeInOutCubicBezier};
          `
        }, [
          cM('left', {
            raw: `
              margin-right: 8px;
            `
          }),
          cM('right', {
            raw: `
              margin-left: 8px;
            `
          }),
          cB('icon', {
            fill: tabScrollButtonColorDefault
          }),
          cM('disabled', {
            raw: `
              cursor: not-allowed;
            `
          }, [
            cB('icon', {
              fill: tabScrollButtonColorDisabled
            })
          ])
        ])
      ]),
      cB('tabs-label-wrapper', {
        raw: `
          display: inline-block;
          font-weight:${strongFontWeight};
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
            transition: left .2s ${easeInOutCubicBezier}, max-width .2s ${easeInOutCubicBezier}, background-color .3s ${easeInOutCubicBezier};
          `,
          backgroundColor: tabBarBackgroundColor
        }, [
          cM('transition-disabled', {
            raw: `
              transition: none;
            `
          })
        ]),
        cB('tabs-label', {
          raw: `
            cursor: pointer;
            white-space: nowrap;
            flex-wrap: nowrap;
            display: inline-flex;
            align-items: center;
            transition: background-color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
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
              transition: color .3s ${easeInOutCubicBezier};
            `
          }, [
            cB('icon', {
              fill: tabCloseButtonColorDeault
            })
          ]),
          cE('label', {
            raw: `
              transition: color .3s ${easeInOutCubicBezier};
            `,
            color: tabTextColorDefault
          })
        ])
      ]),
      cB('tab-panel', {
        raw: `
          width: 100%;
          margin-top: 8px;
          transition: color .3s ${easeInOutCubicBezier}, background-color .3s ${easeInOutCubicBezier};
        `,
        color: panelTextColor
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
              color: tabTextColorHover
            })
          ]),
          cM('active', [
            cE('label', {
              color: tabTextColorActive
            })
          ]),
          cM('disabled', [
            cE('label', {
              color: tabTextColorDisabled
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
          borderTop: `1px solid ${navBorderColor}`,
          borderBottom: `1px solid ${navBorderColor}`
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
            border-radius: ${borderRadius};
            border: 1px solid transparent;
          `
        }, [
          cE('label', {
            raw: `
              font-size: 14px;
            `,
            color: cardTabTextColorDefault
          }),
          c('&:hover', {
            backgroundColor: cardTabBackgroundColor
          }),
          cM('active', {
            backgroundColor: cardTabBackgroundColor,
            border: `1px solid ${cardTabBorderColor}`
          }, [
            cE('label', {
              raw: `
                font-size: 14px;
              `,
              color: cardTabTextColorActive
            })
          ]),
          cM('disabled', [
            cE('label', {
              color: tabTextColorDisabled
            })
          ])
        ])
      ])
    ])
  }
])

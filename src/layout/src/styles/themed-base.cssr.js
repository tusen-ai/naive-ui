import { cTB, c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      textColor,
      color
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('layout', {
      raw: `
        color: ${textColor};
        background-color: ${color};
        box-sizing: border-box;
        position: relative;
        z-index: auto;
        transition:
          margin-left .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier},
          color .3s ${easeInOutCubicBezier};
        flex: auto;
        overflow-x: hidden;
      `
    }, [
      cM('has-sider', {
        raw: `
          display: flex;
          flex-wrap: nowrap;
          width: 100%;
          flex-direction: row;
        `
      }),
      cM('absolute-positioned', {
        raw: `
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        `
      }, [
        cB('layout-sider', {
          raw: `
            z-index: 1;
          `
        })
      ])
    ])
  },
  ({ props }) => {
    const {
      headerBackgroundColor,
      layoutHeaderBorderColor
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('layout-header', {
      raw: `
        transition:
          background-color .3s ${easeInOutCubicBezier},
          box-shadow .3s ${easeInOutCubicBezier},
          border-color .3s ${easeInOutCubicBezier};
        box-sizing: border-box;
        width: 100%;
        background-color: ${headerBackgroundColor};
      `
    }, [
      cM('bordered', {
        raw: `
          border-bottom: solid 1px ${layoutHeaderBorderColor};
        `
      })
    ])
  },
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('layout-content', {
      raw: `
        transition:
          margin-left .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier},
          color .3s ${easeInOutCubicBezier};
        box-sizing: border-box;
        position: relative;
        z-index: auto;
      `
    })
  },
  ({ props }) => {
    const {
      footerBorderColor
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('layout-footer', {
      raw: `
        transition:
          background-color .3s ${easeInOutCubicBezier},
          border-color .3s ${easeInOutCubicBezier};
        box-sizing: border-box;
      `
    }, [
      cM('absolute-positioned', {
        raw: `
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        `
      }),
      cM('bordered', {
        raw: `
          border-top: solid 1px ${footerBorderColor};
        `
      })
    ])
  },
  ({ props }) => {
    const {
      siderBackgroundColor,
      siderToggleButtonFill,
      siderBorderColor,
      siderToggleBarBackgroundColor
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('layout-sider', {
      raw: `
        box-sizing: border-box;
        position: relative;
        z-index: auto;
        transition:
          min-width .3s ${easeInOutCubicBezier},
          max-width .3s ${easeInOutCubicBezier},
          transform .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier};
        background-color: ${siderBackgroundColor};
      `
    }, [
      cB('layout-toggle-button', {
        raw: `
          z-index: 1;
          transition:
            transform .3s ${easeInOutCubicBezier},
            fill .3s ${easeInOutCubicBezier};
          cursor: pointer;
          width: 36px;
          height: 36px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateX(50%) translateY(-50%);
          fill: ${siderToggleButtonFill};
        `
      }),
      cE('border', {
        raw: `
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 1px;
          transition: background-color .3s ${easeInOutCubicBezier};
        `
      }),
      cB('layout-toggle-bar', {
        raw: `
          cursor: pointer;
          height: 72px;
          width: 32px;
          position: absolute;
          top: calc(50% - 36px);
          right: -28px;
        `
      }, [
        cE('top, bottom', {
          raw: `
            position: absolute;
            width: 4px;
            border-radius: 2px;
            height: 38px;
            left: 14px;
            transition: 
              background-color .3s ${easeInOutCubicBezier},
              transform .3s ${easeInOutCubicBezier};
          `
        }),
        cE('bottom', {
          raw: `
            position: absolute;
            top: 34px;
          `
        }),
        c('&:hover', [
          cE('top', {
            raw: `
              transform: rotate(12deg) scale(1.15) translateY(-2px);
            `
          }),
          cE('bottom', {
            raw: `
              transform: rotate(-12deg) scale(1.15) translateY(2px);
            `
          })
        ]),
        cM('collapsed', [
          c('&:hover', [
            cE('top', {
              raw: `
                transform: rotate(-12deg) scale(1.15) translateY(-2px);
              `
            }),
            cE('bottom', {
              raw: `
                transform: rotate(12deg) scale(1.15) translateY(2px);
              `
            })
          ])
        ]),
        cE('top, bottom', {
          raw: `
            background-color: ${siderToggleBarBackgroundColor.default}
          `
        }),
        c('&:hover', [
          cE('top, bottom', {
            raw: `
              background-color: ${siderToggleBarBackgroundColor.hover}
            `
          })
        ]),
        cE('content', {
          raw: `
            opacity: 0;
            transition: opacity .3s ${easeInOutCubicBezier};
          `
        }),
        cM('show-content', [
          cE('content', {
            raw: `
              opacity: 1;
            `
          })
        ]),
        cM('collapsed', [
          cB('layout-toggle-button', {
            raw: `
              transform: translateX(50%) translateY(-50%) rotate(180deg);
            `
          })
        ]),
        cM('absolute-positioned', {
          raw: `
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
          `
        }, [
          cE('content', {
            raw: `
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
            `
          })
        ]),
        cM('bordered', [
          cE('border', {
            raw: `
              background-color: ${siderBorderColor};
            `
          })
        ])
      ])
    ])
  }
])

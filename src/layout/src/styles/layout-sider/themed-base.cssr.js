import { cTB, c, cB, cE, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      siderColor,
      siderToggleButtonColor,
      siderBorderColor,
      siderToggleBarColor,
      siderToggleBarColorHover
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('layout-sider', {
      raw: `
        box-sizing: border-box;
        position: relative;
        z-index: auto;
        transition:
          min-width .3s ${cubicBezierEaseInOut},
          max-width .3s ${cubicBezierEaseInOut},
          transform .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut};
        background-color: ${siderColor};
      `
    }, [
      cB('layout-toggle-button', {
        raw: `
          z-index: 1;
          transition:
            transform .3s ${cubicBezierEaseInOut},
            fill .3s ${cubicBezierEaseInOut};
          cursor: pointer;
          width: 36px;
          height: 36px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateX(50%) translateY(-50%);
          fill: ${siderToggleButtonColor};
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
              background-color .3s ${cubicBezierEaseInOut},
              transform .3s ${cubicBezierEaseInOut};
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
            transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
          }),
          cE('bottom', {
            transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
          })
        ]),
        cM('collapsed', [
          c('&:hover', [
            cE('top', {
              transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
            }),
            cE('bottom', {
              transform: 'rotate(12deg) scale(1.15) translateY(2px)'
            })
          ])
        ]),
        cE('top, bottom', {
          backgroundColor: siderToggleBarColor
        }),
        c('&:hover', [
          cE('top, bottom', {
            backgroundColor: siderToggleBarColorHover
          })
        ])
      ]),
      cE('border', {
        raw: `
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 1px;
          transition: background-color .3s ${cubicBezierEaseInOut};
        `
      }),
      cE('content', {
        raw: `
          opacity: 0;
          transition: opacity .3s ${cubicBezierEaseInOut};
        `
      }),
      cM('show-content', [
        cE('content', {
          opacity: 1
        })
      ]),
      cM('collapsed', [
        cB('layout-toggle-button', {
          transform: 'translateX(50%) translateY(-50%) rotate(180deg)'
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
          backgroundColor: siderBorderColor
        })
      ])
    ])
  }
])

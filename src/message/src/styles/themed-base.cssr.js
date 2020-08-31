import { cTB, c, cB, cE, cM } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../styles/_transitions/icon-switch'

function messageTypeMixin (type, textColor, color, boxShadow, iconColor, loadingCloseColor) {
  return cM(`${type}-type`, {
    raw: `
      color: ${textColor[type]};
      background-color: ${color[type]};
      box-shadow: ${boxShadow[type]};
    `
  }, [
    cE('icon', [
      cB('icon', {
        raw: `
          fill: ${iconColor};
          stroke: ${iconColor};
        `
      })
    ]),
    type === 'loading' && cE('close', [
      cB('icon', {
        raw: `
          cursor: pointer;
          fill: ${loadingCloseColor.default};
          stroke: ${loadingCloseColor.default};
        `
      }, [
        c('&:hover', {
          raw: `
            fill: ${loadingCloseColor.hover};
            stroke: ${loadingCloseColor.hover};
          `
        }),
        c('&:active', {
          raw: `
            fill: ${loadingCloseColor.active};
            stroke: ${loadingCloseColor.active};
          `
        })
      ])
    ])
  ])
}
export default c([
  ({ props }) => {
    const {
      textColor,
      iconColor,
      closeColor,
      loadingCloseColor,
      color,
      boxShadow
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('message', {
      raw: `
        display: flex;
        transition:
          color .3s ${easeInOutCubicBezier},
          box-shadow .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier},
          opacity .3s ${easeInOutCubicBezier},
          transform .3s ${easeInOutCubicBezier},
          max-height .3s ${easeInOutCubicBezier},
          margin-bottom .3s ${easeInOutCubicBezier};
        max-height: 40px;
        opacity: 1;
        margin-bottom: 12px;
        padding: 0 40px;
        height: 40px;
        border-radius: 20px;
        flex-shrink: 0;
        font-weight: 400;
        overflow: hidden;
      `
    }, [
      c('&&-transition-enter, &&-transition-leave-to', {
        raw: `
          opacity: 0;
          transform: translateY(-12px) scale(.5);
          transform-origin: top center;
          max-height: 0;
          margin-bottom: 0;
        `
      }),
      cE('content', {
        raw: `
          display: inline-block;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
        `
      }),
      cE('icon', {
        raw: `
          margin-right: 10px;
          display: inline-flex;
          height: 40px;
          line-height: 40px;
          align-items: center;
        `
      }, [
        cB('icon', {
          raw: `
            font-size: 20px;
          `
        }, [
          cB('base-loading', [
            iconSwitchTransition()
          ]),
          c('svg', [
            iconSwitchTransition()
          ])
        ])
      ]),
      cE('close', {
        raw: `
          height: 40px;
          display: flex;
          align-items: center;
          font-size: 19px;
          margin-left: 12px;
        `
      }, [
        cB('icon', {
          raw: `
            cursor: pointer;
            fill: ${closeColor.default};
            stroke: ${closeColor.default};
          `
        }, [
          c('&:hover', {
            raw: `
              fill: ${closeColor.hover};
              stroke: ${closeColor.hover};
            `
          }),
          c('&:active', {
            raw: `
              fill: ${closeColor.active};
              stroke: ${closeColor.active};
            `
          })
        ])
      ]),
      cM('closable', {
        raw: `
          padding-right: 24px;
        `
      }),
      ...['info', 'success', 'error', 'warning', 'loading'].map(type => messageTypeMixin(type, textColor, color, boxShadow, iconColor, loadingCloseColor))
    ])
  },
  cB('message-container', {
    raw: `
      z-index: 6000;
      position: fixed;
      top: 12px;
      left: 0;
      right: 0;
      height: 0;
      overflow: visible;
      display: flex;
      flex-direction: column;
      align-items: center;
    `
  })
])

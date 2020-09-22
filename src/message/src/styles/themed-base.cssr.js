import { cTB, c, cB, cE, cM, createKey } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../styles/_transitions/icon-switch'

function typeStyle (
  type,
  pallete
) {
  return cM(`${type}-type`, {
    raw: `
      color: ${pallete[createKey('textColor', type)]};
      background-color: ${pallete[createKey('color', type)]};
      box-shadow: ${pallete[createKey('boxShadow', type)]};
    `
  }, [
    cE('icon', [
      cB('icon', {
        raw: `
          fill: ${pallete[createKey('iconColor', type)]};
          stroke: ${pallete[createKey('iconColor', type)]};
        `
      })
    ])
  ])
}

export default c([
  ({ props }) => {
    const {
      closeColor,
      closeColorHover,
      closeColorActive,
      closeColorLoading,
      closeColorLoadingHover,
      closeColorLoadingActive
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('message', {
      raw: `
        display: flex;
        transition:
          color .3s ${cubicBezierEaseInOut},
          box-shadow .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut},
          opacity .3s ${cubicBezierEaseInOut},
          transform .3s ${cubicBezierEaseInOut},
          max-height .3s ${cubicBezierEaseInOut},
          margin-bottom .3s ${cubicBezierEaseInOut};
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
            fill: ${closeColor};
            stroke: ${closeColor};
          `
        }, [
          c('&:hover', {
            raw: `
              fill: ${closeColorHover};
              stroke: ${closeColorHover};
            `
          }),
          c('&:active', {
            raw: `
              fill: ${closeColorActive};
              stroke: ${closeColorActive};
            `
          })
        ])
      ]),
      cM('loading-type', [
        cB('icon', {
          raw: `
            cursor: pointer;
            fill: ${closeColorLoading};
            stroke: ${closeColorLoading};
          `
        }, [
          c('&:hover', {
            raw: `
              fill: ${closeColorLoadingHover};
              stroke: ${closeColorLoadingHover};
            `
          }),
          c('&:active', {
            raw: `
              fill: ${closeColorLoadingActive};
              stroke: ${closeColorLoadingActive};
            `
          })
        ])
      ]),
      cM('closable', {
        raw: `
          padding-right: 24px;
        `
      }),
      ['info', 'success', 'error', 'warning', 'loading']
        .map(type => typeStyle(type, props.$local))
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
  }),
  // TODO: refactor transition style
  cB('message', [
    c('&.message-transition-enter-from, &.message-transition-leave-to', {
      raw: `
        opacity: 0;
        transform: translateY(-12px) scale(.5);
        transform-origin: top center;
        max-height: 0;
        margin-bottom: 0;
      `
    })
  ])
])

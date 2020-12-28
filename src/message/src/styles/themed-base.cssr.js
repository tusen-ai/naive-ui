import { cTB, c, cB, cE, cM, createKey } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

function typeStyle (
  type,
  palette
) {
  return cM(`${type}-type`, {
    raw: `
      color: ${palette[createKey('textColor', type)]};
      background-color: ${palette[createKey('color', type)]};
      box-shadow: ${palette[createKey('boxShadow', type)]};
    `
  }, [
    cE('icon', [
      cB('icon', {
        color: palette[createKey('iconColor', type)]
      })
    ]),
    cE('close', [
      cB('icon', {
        raw: `
          cursor: pointer;
          color: ${palette[createKey('closeColor', type)]};
        `
      }, [
        c('&:hover', {
          color: palette[createKey('closeColorHover', type)]
        }),
        c('&:active', {
          color: palette[createKey('closeColorPressed', type)]
        })
      ])
    ])
  ])
}

export default c([
  ({ props }) => {
    const {
      height,
      padding,
      paddingClosable,
      maxWidth,
      iconMargin,
      closeMargin,
      closeSize,
      iconSize
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$global
    return cTB('message', {
      raw: `
        display: flex;
        align-items: center;
        transition:
          color .3s ${cubicBezierEaseInOut},
          box-shadow .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut},
          opacity .3s ${cubicBezierEaseInOut},
          transform .3s ${cubicBezierEaseInOut},
          max-height .3s ${cubicBezierEaseInOut},
          margin-bottom .3s ${cubicBezierEaseInOut};
        opacity: 1;
        margin-bottom: 12px;
        padding: ${padding};
        height: ${height};
        max-height: ${height};
        border-radius: 20px;
        flex-shrink: 0;
        font-weight: 400;
        overflow: hidden;
        max-width: ${maxWidth};
      `
    }, [
      cE('content', {
        raw: `
          display: inline-block;
          height: ${height};
          line-height: ${height};
          font-size: 15px;
        `
      }),
      cE('icon', {
        raw: `
          margin-right: ${iconMargin};
          display: inline-flex;
          height: ${height};
          line-height: ${height};
          align-items: center;
        `
      }, [
        cB('icon', {
          raw: `
            font-size: ${iconSize};
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
          display: flex;
          align-items: center;
          justify-content: center;
          height: ${closeSize};
          width: ${closeSize};
          border-radius: 100px;
          font-size: ${closeSize};
          margin: ${closeMargin};
        `
      }, [
        cB('icon', {
          transition: `color .3s ${cubicBezierEaseInOut}`
        })
      ]),
      cM('closable', {
        padding: paddingClosable
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

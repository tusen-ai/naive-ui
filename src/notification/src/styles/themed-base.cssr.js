import { cTB, c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  cB('notification-container', {
    raw: `
      z-index: 4000;
      position: fixed;
      top: 12px;
      left: 0;
      right: 0;
      height: 0;
      overflow: visible;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    `
  }, [
    c('>', [
      cB('scrollbar', {
        raw: `
          height: -moz-fit-content !important;
          height: fit-content !important;
          max-height: 100vh !important;
        `
      }, [
        c('>', [
          cB('scrollbar-container', {
            raw: `
              height: -moz-fit-content !important;
              height: fit-content !important;
              max-height: 100vh !important;
            `
          }, [
            cB('scrollbar-content', {
              raw: `
                padding-top: 12px;
              `
            })
          ])
        ])
      ])
    ])
  ]),
  ({ props }) => {
    const {
      easeOutCubicBezier
    } = props.$base
    const {
      color,
      avatarFill,
      textColor,
      closeColor,
      headerTextColor,
      contentTextColor,
      descriptionTextColor,
      actionTextColor,
      borderRadius,
      strongFontWeight
    } = props.$local
    function notificationTypeMixin (type) {
      return cM(`${type}-type`, [
        cE('avatar', [
          cB('icon', {
            raw: `
              fill: ${avatarFill[type]};
              stroke: ${avatarFill[type]};
            `
          })
        ])
      ])
    }
    return [
      cTB('notification', {
        raw: `
          background-color: ${color};
          color: ${textColor};
          transition:
            background-color .3s ${easeOutCubicBezier},
            color .3s ${easeOutCubicBezier},
            opacity .3s ${easeOutCubicBezier},
            transform .3s ${easeOutCubicBezier},
            max-height .3s ${easeOutCubicBezier},
            margin-bottom .3s linear,
            box-shadow .3s ${easeOutCubicBezier};
          font-family: inherit;
          font-size: 14px;
          font-weight: 400;
          position: relative;
          display: flex;
          overflow: hidden;
          flex-shrink: 0;
          margin-bottom: 12px;
          margin-left: 12px;
          margin-right: 16px;
          padding-left: 16px;
          padding-right: 16px;
          width: 365px;
          border-radius: ${borderRadius};
          box-shadow:  0px 2px 12px 0px rgba(0, 0, 0, 0.18);
          box-sizing: border-box;
          opacity: 1;
        `
      }, [
        ['success', 'info', 'warning', 'error', 'default'].map(type => notificationTypeMixin(type)),
        c('&-transition-enter, &-transition-leave-to', {
          raw: `
            opacity: 0;
            margin-bottom: 0;
            transform: translateX(calc(100% + 16px));
          `
        }),
        c('&-transition-leave, &-transition-enter-to', {
          raw: `
            opacity: 1;
            transform: translateX(0);
          `
        }),
        cM('no-avatar', [
          cB('notification-main', {
            raw: `
              margin-left: 8px;
              width: calc(100% - 8px);
            `
          })
        ]),
        cM('closable', [
          cB('notification-main', [
            c('& > *:first-child', {
              raw: `
                padding-right: 20px
              `
            })
          ])
        ]),
        cE('close', {
          raw: `
            position: absolute;
            top: 16px;
            right: 12px;
            font-size: 20px;
            cursor: pointer;
          `
        }, [
          cB('icon', {
            raw: `
              fill: ${closeColor.default};
              stroke: ${closeColor.default};
          `
          }),
          c('&:hover', [
            cB('icon', {
              raw: `
                fill: ${closeColor.hover};
                stroke: ${closeColor.hover};
              `
            })
          ]),
          c('&:active', [
            cB('icon', {
              raw: `
                fill: ${closeColor.active};
                stroke: ${closeColor.active};
              `
            })
          ])
        ]),
        cE('avatar', {
          raw: `
            position: absolute;
            top: 16px;
            left: 16px;
            width: 28px;
            height: 28px;
            font-size: 28px;
          `
        }),
        cB('notification-main', {
          raw: `
            padding-top: 16px;
            padding-bottom: 16px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            margin-left: 40px;
            width: calc(100% - 40px);
          `
        }, [
          cB('notification-main-footer', {
            raw: `
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 8px;
            `
          })
        ]),
        cE('header', {
          raw: `
            font-weight: ${strongFontWeight};
            font-size: 16px;
            transition: color .3s ${easeOutCubicBezier};
            color: ${headerTextColor};
          `
        }),
        cE('description', {
          raw: `
            margin-top: 8px;
            font-size: 12px;
            transition: color .3s ${easeOutCubicBezier};
            color: ${descriptionTextColor};
          `
        }),
        cE('content', {
          raw: `
            line-height: 1.75;
            margin: 12px 0 0 0;
            font-family: inherit;
            white-space: pre-wrap;
            word-wrap: break-word;
            transition: color .3s ${easeOutCubicBezier};
            color: ${contentTextColor};
          `
        }, [
          c('&:first-child', {
            raw: `
              margin: 0;
            `
          })
        ]),
        cB('notification-main-footer', {
          raw: `
            margin-top: 12px;
          `
        }, [
          cE('meta', {
            raw: `
              font-size: 12px;
              transition: color .3s ${easeOutCubicBezier};
              color: ${descriptionTextColor};
            `
          }),
          cE('action', {
            raw: `
              cursor: pointer;
              transition: color .3s ${easeOutCubicBezier};
              color: ${actionTextColor};
            `
          })
        ])
      ])
    ]
  }

])

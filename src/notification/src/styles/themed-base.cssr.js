import { cTB, c, cB, cE, cM, createKey } from '../../../_utils/cssr'

function typeStyle (type, color) {
  return cM(`${type}-type`, [
    cE('avatar', [
      cB('icon', {
        color
      })
    ])
  ])
}

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
          overflow: visible;
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
    ]),
    cM('scrollable', {
      top: 0
    })
  ]),
  ({ props }) => {
    const {
      cubicBezierEaseOut,
      cubicBezierEaseIn,
      cubicBezierEaseInOut
    } = props.$base
    const {
      color,
      textColor,
      closeColor,
      closeColorHover,
      closeColorActive,
      headerTextColor,
      contentTextColor,
      descriptionTextColor,
      actionTextColor,
      borderRadius,
      headerFontWeight
    } = props.$local
    return [
      cB('notification', [
        c('&-transition-enter-from, &-transition-leave-to', {
          raw: `
            opacity: 0;
            margin-bottom: 0 !important;
            transform: translateX(calc(100% + 16px));
          `
        }),
        c('&-transition-leave-from, &-transition-enter-to', {
          raw: `
            opacity: 1;
            transform: translateX(0);
          `
        }),
        c('&-transition-leave-active', {
          raw: `
            transition:
              background-color .3s ${cubicBezierEaseInOut},
              color .3s ${cubicBezierEaseInOut},
              opacity .3s ${cubicBezierEaseInOut},
              transform .3s ${cubicBezierEaseIn},
              max-height .3s ${cubicBezierEaseInOut},
              margin-bottom .3s linear,
              box-shadow .3s ${cubicBezierEaseInOut};
          `
        })
      ]),
      cTB('notification', {
        raw: `
          background-color: ${color};
          color: ${textColor};
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut},
            opacity .3s ${cubicBezierEaseInOut},
            transform .3s ${cubicBezierEaseOut},
            max-height .3s ${cubicBezierEaseInOut},
            margin-bottom .3s linear,
            box-shadow .3s ${cubicBezierEaseInOut};
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
        // TODO: refactor type styles & transition
        ['success', 'info', 'warning', 'error', 'default']
          .map(type => typeStyle(type, props.$local[createKey('iconColor', type)])),
        cM('show-avatar', [
          cB('notification-main', {
            raw: `
              margin-left: 40px;
              width: calc(100% - 40px);  
            `
          })
        ]),
        cM('closable', [
          cB('notification-main', [
            c('> *:first-child', {
              raw: `
                padding-right: 20px
              `
            })
          ]),
          cE('close', {
            raw: `
              position: absolute;
              top: 16px;
              right: 12px;
              font-size: 14px;
              cursor: pointer;
            `
          }, [
            cB('icon', {
              color: closeColor
            }),
            c('&:hover', [
              cB('icon', {
                color: closeColorHover
              })
            ]),
            c('&:active', [
              cB('icon', {
                color: closeColorActive
              })
            ])
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
            margin-left: 8px;
            width: calc(100% - 8px);
          `
        }, [
          cB('notification-main-footer', {
            raw: `
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 8px;
            `
          }, [
            cE('meta', {
              raw: `
                font-size: 12px;
                transition: color .3s ${cubicBezierEaseOut};
                color: ${descriptionTextColor};
              `
            }),
            cE('action', {
              raw: `
                cursor: pointer;
                transition: color .3s ${cubicBezierEaseOut};
                color: ${actionTextColor};
              `
            })
          ]),
          cE('header', {
            raw: `
              font-weight: ${headerFontWeight};
              font-size: 16px;
              transition: color .3s ${cubicBezierEaseOut};
              color: ${headerTextColor};
            `
          }),
          cE('description', {
            raw: `
              margin-top: 8px;
              font-size: 12px;
              transition: color .3s ${cubicBezierEaseOut};
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
              transition: color .3s ${cubicBezierEaseOut};
              color: ${contentTextColor};
            `
          }, [
            c('&:first-child', {
              raw: `
                margin: 0;
              `
            })
          ])
        ])
      ])
    ]
  }
])

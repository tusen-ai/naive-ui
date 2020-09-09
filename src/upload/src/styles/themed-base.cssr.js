import { c, cM, cTB, cB, cE } from '../../../_utils/cssr'
import fadeInHeightExpand from '../../../styles/_transitions/fade-in-height-expand'
import createIconSwitchTransition from '../../../styles/_transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier,
      borderRadius
    } = props.$base
    const {
      draggerColor,
      draggerBorderColorHover,
      itemColorHover,
      itemColorErrorHover,
      itemTextColorError,
      itemTextColorSuccess,
      itemTextColor,
      itemIconColor,
      itemDisabledOpacity,
      draggerBorderColor
    } = props.$local
    const iconSwitchTransition = createIconSwitchTransition()

    return cTB('upload', [
      cE('file-input', {
        raw: `
          display: block;
          width: 0;
          height: 0;
          opacity: 0;
        `
      }),
      cE('activator', {
        raw: `
          display: inline-block;
        `
      }),
      cM('dragger-inside', [
        cE('activator', {
          raw: `
            display: block;
          `
        })
      ]),
      cB('upload-dragger', {
        raw: `
          cursor: pointer;
          box-sizing: border-box;
          width: 100%;
          text-align: center;
          border-radius: ${borderRadius};
          padding: 24px;
          transition:
            border-color .3s ${easeInOutCubicBezier},
            background-color .3s ${easeInOutCubicBezier};
          background-color: ${draggerColor};
          border: 1px dashed ${draggerBorderColor};
        `
      }, [
        c('&:hover', {
          raw: `
            border-color:${draggerBorderColorHover};
          `
        })
      ]),
      cB('upload-file-list', {
        raw: `
          margin-top: 8px;
          line-height: 1.75;
        `
      }, [
        cB('upload-file', {
          raw: `
            display: block;
            box-sizing: border-box;
            cursor: default;
            padding: 0px 12px 0 6px;
            transition: background-color .3s  ${easeInOutCubicBezier};
            border-radius: ${borderRadius};
          `
        }, [
          fadeInHeightExpand(),
          cB('progress', {
            raw: `
              box-sizing: border-box;
              padding-bottom: 6px;
              margin-bottom: 6px;
            `
          }, [
            fadeInHeightExpand({
              foldPadding: true
            })
          ]),
          c('&:hover', {
            raw: `
              background-color: ${itemColorHover};
            `
          }, [
            cB('upload-file-info', [
              cE('action', {
                raw: `
                  opacity: 1;
                `
              })
            ])
          ]),
          cM('error-status', [
            c('&:hover', {
              raw: `
                background-color: ${itemColorErrorHover};
              `
            }),
            cB('upload-file-info', [
              cE('name', {
                raw: `color: ${itemTextColorError}`
              })
            ])
          ]),
          cM('with-url', {
            raw: `
              cursor: pointer;
            `
          }, [
            cB('upload-file-info', [
              cE('name', {
                raw: `
                  text-decoration: underline;
                  color: ${itemTextColorSuccess};
                  text-decoration-color: ${itemTextColorSuccess};
                `
              })
            ])
          ]),
          cB('upload-file-info', {
            raw: `
              position: relative;
              padding-top: 6px;
              padding-bottom: 6px;
            `
          }, [
            cE('action', {
              raw: `
                padding-top: inherit;
                padding-bottom: inherit;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 80px;
                display: flex;
                align-items: center;
                transition: opacity .2s ${easeInOutCubicBezier};
                flex-direction: row-reverse;
                opacity: 0;
              `
            }, [
              cB('button', [
                cB('icon', [
                  c('svg', [
                    iconSwitchTransition
                  ])
                ])
              ])
            ]),
            cE('name', {
              raw: `
                text-overflow: ellipsis;
                overflow: hidden;
                text-decoration: underline;
                text-decoration-color: transparent;
                font-size: 14px;
                transition:
                  color .3s ${easeInOutCubicBezier},
                  text-decoration-color .3s ${easeInOutCubicBezier};
                color: ${itemTextColor};    
              `
            }, [
              cB('icon', {
                raw: `
                  font-size: 18px;
                  margin-right: 2px;
                  vertical-align: middle;
                  fill: ${itemIconColor};
                  stroke: ${itemIconColor};
                `
              })
            ])
          ])
        ])
      ]),
      cM('disabled', {
        raw: `
          opacity: ${itemDisabledOpacity}
        `
      }, [
        cE('activator', {
          raw: `
            cursor: not-allowed;
          `
        }),
        cB('upload-file-list', {
          raw: `
            cursor: not-allowed;
          `
        }),
        cB('upload-dragger', {
          raw: `
            cursor: not-allowed;
          `
        })
      ]),
      cM('drag-over', [
        cB('upload-dragger', {
          raw: `
            border-color: ${draggerBorderColorHover};
          `
        })
      ])
    ])
  }
])

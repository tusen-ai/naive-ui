import { cTB, c, cB, cE, cM, cNotM, insideFormItem, createKey } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      borderRadius,
      iconSize
    } = props.$local
    const {
      placeholderColor,
      color,
      border,
      borderHover,
      colorFocus,
      borderFocus,
      boxShadowFocus,
      iconColor,
      iconOpacity,
      textColor,
      caretColor,
      borderDisabled,
      colorDisabled,
      textColorDisabled,
      placeholderColorDisabled,
      textDecorationColor
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('input', {
      raw: `
        z-index: auto;
        outline: none;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        display: inline-block;
      `,
      borderRadius,
      backgroundColor: color,
      transition: `
        box-shadow .3s ${cubicBezierEaseInOut},
        background-color .3s ${cubicBezierEaseInOut}
      `
    }, [
      cM('split', {
        display: 'inline-flex'
      }, [
        cE('input, placeholder', {
          textAlign: 'center'
        })
      ]),
      cM('textarea', {
        raw: `
          padding-left: 0;
          padding-right: 0;
        `
      }, [
        cE('placeholder', {
          whiteSpace: 'unset'
        })
      ]),
      cM('disabled', {
        cursor: 'not-allowed',
        backgroundColor: colorDisabled
      }, [
        cE('state-border', {
          border: borderDisabled
        }),
        cE('input, textarea', {
          cursor: 'not-allowed',
          color: textColorDisabled
        }),
        cE('placeholder', {
          color: placeholderColorDisabled
        }),
        cE('splitor', {
          color: textColorDisabled
        })
      ]),
      cM('bordered', [
        cE('border', {
          border
        })
      ]),
      cNotM('disabled', [
        cM('focus', {
          backgroundColor: colorFocus
        }, [
          cE('state-border', {
            border: borderFocus
          }),
          cE('box-shadow', {
            boxShadow: boxShadowFocus
          })
        ]),
        c('&:hover', [
          cE('state-border', {
            border: borderHover
          })
        ])
      ]),
      cE('border, state-border', {
        raw: `
          box-sizing: border-box;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          transition: border-color .3s ${cubicBezierEaseInOut};
        `,
        border,
        borderColor: 'transparent',
        borderRadius
      }),
      cE('state-border', {
        zIndex: 1
      }),
      cE('box-shadow', {
        raw: `
          z-index: 1;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
        `,
        border,
        borderColor: 'transparent',
        borderRadius,
        transition: `
          border-color .3s ${cubicBezierEaseInOut},
          box-shadow .3s ${cubicBezierEaseInOut}
        `
      }),
      cE('placeholder', {
        raw: `
          white-space: nowrap;
          pointer-events: none;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          overflow: hidden;
          padding-left: 0 !important;
          padding-right: 0 !important;
        `,
        color: placeholderColor,
        transition: `color .3s ${cubicBezierEaseInOut}`
      }),
      cE('suffix, prefix', {
        raw: `
          position: absolute;
          line-height: 1.75;
          height: 0;
          white-space: nowrap;
          display: flex;
          align-items: center;
          top: 50%;
        `,
        width: iconSize
      }, [
        cB('icon', {
          justifySelf: 'center',
          fontSize: iconSize,
          color: iconColor,
          transition: `color .3s ${cubicBezierEaseInOut}`
        }, [
          c('svg', {
            opacity: iconOpacity
          })
        ])
      ]),
      cE('suffix', {
        justifyContent: 'flex-end',
        right: '12px'
      }, [
        fadeInScaleUpTransition() // button suffix
      ]),
      cE('prefix', {
        justifyContent: 'flex-start',
        left: '12px'
      }),
      cE('textarea, textarea-mirror', {
        raw: `
          display: inline-block;
          vertical-align: bottom;
          box-sizing: border-box;
          font-family: inherit;
          font-size: inherit;
          line-height: 1.75;
          margin: 0;
          resize: vertical;
          padding-left: 14px;
          padding-right: 14px;
        `
      }),
      cE('textarea', [
        cM('autosize', {
          raw: `
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            resize: none;
          `
        })
      ]),
      cE('textarea-mirror', {
        raw: `
          overflow: hidden;
          visibility: hidden;
          position: static;
          white-space: pre-wrap;
          overflow-wrap: break-word;
        `
      }),
      cE('input, textarea', {
        raw: `
          -webkit-appearance: none;
          box-sizing: border-box;
          border: none;
          font-size: inherit;
          outline: none;
          font-family: inherit;
          width: 100%;
          background-color: transparent;
          min-width: 0;
          text-decoration-color: ${textDecorationColor};
          color: ${textColor};
          caret-color: ${caretColor};
          transition:
            caret-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut},
            text-decoration-color .3s ${cubicBezierEaseInOut};
        `
      }, [
        c('&::placeholder', {
          color: 'transparent'
        })
      ]),
      cE('splitor', {
        transition: `color .3s ${cubicBezierEaseInOut}`,
        color: textColor,
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
      }),
      cB('input-clear', {
        display: 'flex',
        marginRight: '4px'
      }),
      cB('input-first-input', {
        flexGrow: 1,
        position: 'relative'
      }),
      cB('input-second-input', {
        flexGrow: 1,
        position: 'relative'
      })
    ])
  },
  ({ props }) => {
    return [
      'warning',
      'error'
    ].map(status => {
      const pallete = props.$local
      return insideFormItem(
        status,
        cTB('input', [
          cM('stateful', [
            cE('state-border', {
              border: pallete[createKey('border', status)]
            }),
            cNotM('disabled', [
              c('&:hover', [
                cE('state-border', {
                  border: pallete[createKey('borderHover', status)]
                })
              ]),
              cM('focus', {
                backgroundColor: pallete[createKey('colorFocus', status)]
              }, [
                cE('state-border', {
                  border: pallete[createKey('borderFocus', status)]
                }),
                cE('box-shadow', {
                  boxShadow: pallete[createKey('boxShadowFocus', status)]
                })
              ])
            ]),
            cE('input, textarea', {
              caretColor: pallete[createKey('caretColor', status)]
            })
          ])
        ])
      )
    })
  }
])

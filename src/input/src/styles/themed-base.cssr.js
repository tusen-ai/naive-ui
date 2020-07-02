import { cTB2, c, cB, cE, cM, insideFormItem } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      borderRadius,
      iconSize
    } = props.$local
    const {
      placeholderColor,
      backgroundColor,
      boxShadow,
      borderMaskColor,
      hoverBorderMaskColor,
      focusBackgroundColor,
      focusBorderMaskColor,
      focusBorderMaskBoxShadow,
      iconColor,
      textColor,
      caretColor,
      disabledBoxShadow,
      disabledBorderMaskColor,
      disabledBackgroundColor,
      disabledTextColor,
      disabledPlaceholderColor,
      disabledIconColor
    } = props.$local.default
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB2('input', {
      raw: `
        z-index: auto;
        outline: none;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        display: inline-block;
      `,
      borderRadius,
      backgroundColor,
      boxShadow,
      transition: `
        box-shadow .3s ${easeInOutCubicBezier},
        background-color .3s ${easeInOutCubicBezier}
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
        boxShadow: disabledBoxShadow,
        backgroundColor: disabledBackgroundColor
      }, [
        cE('border-mask', {
          borderColor: disabledBorderMaskColor
        }),
        cE('input, textarea', {
          cursor: 'not-allowed',
          color: disabledTextColor
        }),
        cE('placeholder', {
          color: disabledPlaceholderColor
        }),
        cE('suffix, prefix', [
          cB('icon', {
            fill: disabledIconColor,
            stroke: disabledIconColor
          })
        ]),
        cE('splitor', {
          color: disabledTextColor
        })
      ]),
      cM('focus', {
        backgroundColor: focusBackgroundColor
      }, [
        cE('border-mask', {
          borderColor: focusBorderMaskColor,
          boxShadow: focusBorderMaskBoxShadow
        })
      ]),
      c('&:hover', [
        cE('border-mask', {
          borderColor: hoverBorderMaskColor
        })
      ]),
      cE('border-mask', {
        raw: `
          z-index: 1;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
        `,
        border: `1px solid ${borderMaskColor}`,
        borderRadius,
        transition: `
          border-color .3s ${easeInOutCubicBezier},
          box-shadow .3s ${easeInOutCubicBezier}
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
        transition: `color .3s ${easeInOutCubicBezier}`
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
          fill: iconColor,
          stroke: iconColor
        })
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
          transition:
            color .3s ${easeInOutCubicBezier},
            text-decoration-color .3s ${easeInOutCubicBezier};
        `,
        color: textColor,
        caretColor: caretColor
      }, [
        c('&::placeholder', {
          color: 'transparent'
        })
      ]),
      cE('splitor', {
        transition: `color .3s ${easeInOutCubicBezier}`,
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
      const pallete = props.$local[status]
      return insideFormItem(
        status,
        cB('input', [
          cM('stateful', [
            cE('border-mask', {
              borderColor: pallete.borderMaskColor
            }),
            c('&:hover', [
              cE('border-mask', {
                borderColor: pallete.hoverBorderMaskColor
              })
            ]),
            cM('focus', {
              backgroundColor: pallete.focusBackgroundColor
            }, [
              cE('border-mask', {
                borderColor: pallete.focusBorderMaskColor,
                boxShadow: pallete.focusBorderMaskBoxShadow
              })
            ]),
            cE('input, textarea', {
              caretColor: pallete.caretColor
            })
          ])
        ])
      )
    })
  }
])

import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      borderRadius,
      checkable,
      disabledOpacity
    } = props.$local
    const {
      textColor: checkableTextColor,
      hoverTextColor: checkableHoverTextColor,
      activeTextColor: checkableActiveTextColor,
      backgroundColor: checkableBackgroundColor,
      hoverBackgroundColor: checkableHoverBackgroundColor,
      activeBackgroundColor: checkableActiveBackgroundColor,
      checkedTextColor,
      checkedBackgroundColor,
      checkedHoverBackgroundColor,
      checkedActiveBackgroundColor
    } = checkable
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('tag', {
      raw: `
        white-space: nowrap;
        position: relative;
        padding: 0 7px;
        box-sizing: border-box;
        cursor: default;
        display: inline-block;
      `,
      borderRadius,
      transition: `
        background-color .3s ${easeInOutCubicBezier},
        color .3s ${easeInOutCubicBezier},
        box-shadow .3s ${easeInOutCubicBezier},
        opacity .3s ${easeInOutCubicBezier}
      `
    }, [
      cE('close', {
        cursor: 'pointer'
      }),
      cM('checkable', {
        cursor: 'pointer'
      }),
      cM('disabled', {
        cursor: 'not-allowed !important',
        opacity: disabledOpacity
      }, [
        cE('close', {
          cursor: 'not-allowed !important'
        })
      ]),
      cM('closable', {
        paddingRight: '18px'
      }, [
        cE('close', {
          raw: `
            right: 3px;
            top: 50%;
            transform: translateY(-50%);
            height: 14px;
            width: 14px;
            line-height: 14px;
            position: absolute;
          `,
          transition: `
            fill .2s ${easeInOutCubicBezier},
            color .3s ${easeInOutCubicBezier}
          `
        })
      ]),
      cM('checkable', {
        boxShadow: 'none',
        color: checkableTextColor,
        backgroundColor: checkableBackgroundColor
      }, [
        cNotM('disabled', [
          c('&:hover', {
            backgroundColor: checkableHoverBackgroundColor
          }, [
            cNotM('checked', {
              color: checkableHoverTextColor
            })
          ]),
          c('&:active', {
            backgroundColor: checkableActiveBackgroundColor
          }, [
            cNotM('checked', {
              color: checkableActiveTextColor
            })
          ])
        ]),
        cM('checked', {
          color: checkedTextColor,
          backgroundColor: checkedBackgroundColor
        }, [
          cNotM('disabled', [
            c('&:hover', {
              backgroundColor: checkedHoverBackgroundColor
            }),
            c('&:active', {
              backgroundColor: checkedActiveBackgroundColor
            })
          ])
        ])
      ])
    ])
  }
])

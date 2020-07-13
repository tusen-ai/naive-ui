import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      borderRadius,
      checkableTextColor,
      checkableBackgroundColor,
      checkableHoverTextColor,
      checkableHoverBackgroundColor,
      checkableActiveTextColor,
      checkableActiveBackgroundColor,
      checkableCheckedHoverBackgroundColor,
      checkableCheckedActiveBackgroundColor
    } = props.$local
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
        background-color .2s ${easeInOutCubicBezier},
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
        cursor: 'not-allowed !important'
      }, [
        cE('close', {
          cursor: 'not-allowed !important'
        }),
        cM('checkable', {
          opacity: '0.4'
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
          color: checkableActiveTextColor,
          backgroundColor: checkableActiveBackgroundColor
        }, [
          cNotM('disabled', [
            c('&:hover', {
              backgroundColor: checkableCheckedHoverBackgroundColor
            }),
            c('&:active', {
              backgroundColor: checkableCheckedActiveBackgroundColor
            })
          ])
        ])
      ])
    ])
  }
])

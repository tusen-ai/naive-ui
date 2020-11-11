import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      borderRadius,
      checkable,
      opacityDisabled,
      padding
    } = props.$local
    const {
      textColor: checkableTextColor,
      textColorHover: checkableHoverTextColor,
      textColorActive: checkableActiveTextColor,
      color: checkableBackgroundColor,
      colorHover: checkableHoverBackgroundColor,
      colorActive: checkableActiveBackgroundColor,
      textColorChecked,
      colorChecked,
      colorCheckedHover,
      colorCheckedActive
    } = checkable
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('tag', {
      raw: `
        white-space: nowrap;
        position: relative;
        box-sizing: border-box;
        cursor: default;
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
      `,
      padding,
      borderRadius,
      transition: `
        background-color .3s ${cubicBezierEaseInOut},
        color .3s ${cubicBezierEaseInOut},
        box-shadow .3s ${cubicBezierEaseInOut},
        opacity .3s ${cubicBezierEaseInOut}
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
        opacity: opacityDisabled
      }, [
        cE('close', {
          cursor: 'not-allowed !important'
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
          color: textColorChecked,
          backgroundColor: colorChecked
        }, [
          cNotM('disabled', [
            c('&:hover', {
              backgroundColor: colorCheckedHover
            }),
            c('&:active', {
              backgroundColor: colorCheckedActive
            })
          ])
        ])
      ])
    ])
  }
])

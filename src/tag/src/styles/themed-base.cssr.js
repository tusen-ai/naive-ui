import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      closeMargin,
      borderRadius,
      opacityDisabled,
      padding,
      textColorCheckable,
      textColorHoverCheckable,
      textColorPressedCheckable,
      textColorChecked,
      colorCheckable,
      colorHoverCheckable,
      colorPressedCheckable,
      colorChecked,
      colorCheckedHover,
      colorCheckedPressed
    } = props.$local
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
      cE('content', {
        display: 'inline-block'
      }),
      cE('close', {
        margin: closeMargin,
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
        color: textColorCheckable,
        backgroundColor: colorCheckable
      }, [
        cNotM('disabled', [
          c('&:hover', {
            backgroundColor: colorHoverCheckable
          }, [
            cNotM('checked', {
              color: textColorHoverCheckable
            })
          ]),
          c('&:active', {
            backgroundColor: colorPressedCheckable
          }, [
            cNotM('checked', {
              color: textColorPressedCheckable
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
              backgroundColor: colorCheckedPressed
            })
          ])
        ])
      ])
    ])
  }
])

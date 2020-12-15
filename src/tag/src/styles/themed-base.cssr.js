import { c, cE, cM, cTB, cNotM, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from 'seemly'
export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local
    } = props
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
    } = $local
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
      ['small', 'medium', 'large'].map(size => {
        const {
          [createKey('height', size)]: height,
          [createKey('fontSize', size)]: fontSize,
          [createKey('closeSize', size)]: closeSize
        } = $local
        const numericHalfHeight = depx(height) / 2
        const halfHeight = pxfy(numericHalfHeight)
        return cM(`${size}-size`, {
          lineHeight: height,
          height,
          fontSize
        }, [
          cE('close', {
            fontSize: closeSize
          }),
          cM('round', {
            padding: `0 ${halfHeight}`,
            borderRadius: halfHeight
          })
        ])
      }),
      ['info', 'success', 'warning', 'error', 'default'].map(type => {
        const {
          [createKey('borderColor', type)]: boxShadowColor,
          [createKey('textColor', type)]: textColor,
          [createKey('color', type)]: backgroundColor,
          [createKey('closeColor', type)]: closeColor,
          [createKey('closeColorHover', type)]: closeColorHover,
          [createKey('closeColorPressed', type)]: closeColorPressed
        } = $local
        return cNotM('checkable', [
          cM(`${type}-type`, {
            boxShadow: `inset 0 0 0 1px ${boxShadowColor}`,
            color: textColor,
            backgroundColor
          }, [
            cE('close', {
              color: closeColor
            }),
            cNotM('disabled', [
              cE('close', [
                c('&:hover', {
                  color: closeColorHover
                }),
                c('&:active', {
                  color: closeColorPressed
                })
              ])
            ])
          ])
        ])
      }),
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

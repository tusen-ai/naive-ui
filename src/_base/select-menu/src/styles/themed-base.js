import { cTB, c, cB, cE, cM, cNotM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      borderRadius,
      color,
      boxShadow,
      groupHeaderTextColor,
      actionDividerColor,
      optionTextColorPressed,
      optionTextColor,
      optionTextColorDisabled,
      optionTextColorSelected,
      optionOpacityDisabled,
      optionCheckColor,
      actionTextColor
    } = props.$local
    return cTB('base-select-menu', {
      raw: `
        outline: none;
        margin-top: 4px;
        margin-bottom: 4px;
        z-index: 0;
        position: relative;
        border-radius: ${borderRadius};
        transition: ${cubicBezierEaseInOut};
        overflow: hidden;
        background-color: ${color};
        box-shadow: ${boxShadow};
      `
    }, [
      cB('base-select-menu-option-wrapper', {
        position: 'relative',
        width: '100%'
      }),
      cE('action', {
        padding: '8px 14px',
        fontSize: '14px',
        transition: `
          color .3s ${cubicBezierEaseInOut},
          border-color .3s ${cubicBezierEaseInOut}
        `,
        borderTop: `1px solid ${actionDividerColor}`,
        color: actionTextColor
      }),
      cB('base-select-group-header', {
        cursor: 'default',
        padding: '0 14px',
        color: groupHeaderTextColor
      }),
      cB('base-select-option', {
        raw: `
          cursor: pointer;
          position: relative;
          padding: 0 14px;
          white-space: nowrap;
          transition:
            color .3s ${cubicBezierEaseInOut},
            opacity .3s ${cubicBezierEaseInOut};
          text-overflow: ellipsis;
          overflow: hidden;
          box-sizing: border-box;
          color: ${optionTextColor};
          opacity: 1;
        `
      }, [
        c('&:active', {
          color: optionTextColorPressed
        }),
        cM('grouped', {
          padding: '0 21px'
        }),
        cM('selected', {
          color: optionTextColorSelected
        }),
        cM('disabled', {
          cursor: 'not-allowed'
        }, [
          cNotM('selected', {
            color: optionTextColorDisabled
          }),
          cM('selected', {
            opacity: optionOpacityDisabled
          })
        ])
      ]),
      cM('no-tracking-rect', [
        cB('base-select-option', [
          cNotM('disabled', [
            c('&:hover', {
              color: optionTextColorSelected
            })
          ])
        ])
      ]),
      cM('multiple', [
        cB('base-select-option', {
          position: 'relative',
          transition: `color .3s ${cubicBezierEaseInOut}`,
          paddingRight: '28px'
        }, [
          cM('selected', [
            c('&::after', {
              opacity: 1,
              transform: 'rotate(45deg) scale(1)'
            })
          ]),
          c('&::after', {
            raw: `
              content: '';
              height: 6px;
              width: 3px;
              position: absolute;
              right: 14px;
              transform: rotate(45deg) scale(.5);
              top: calc(50% - 4px);
              opacity: 0;
              transition:
                transform .3s ${cubicBezierEaseInOut},
                opacity .3s ${cubicBezierEaseInOut};
              border-right: 1px solid ${optionCheckColor};
              border-bottom: 1px solid ${optionCheckColor};
            `
          })
        ])
      ])
    ])
  }
])

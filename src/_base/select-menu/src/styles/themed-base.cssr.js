import { cTB, c, cB, cE, cM, cNotM, createKey } from '../../../../_utils/cssr'
import { depx, pxfy } from 'seemly'

export default c([
  ({ props }) => {
    const {
      $global: { cubicBezierEaseInOut },
      $local
    } = props
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
      actionTextColor,
      optionColorPending
    } = props.$local
    return cTB(
      'base-select-menu',
      {
        raw: `
          outline: none;
          margin-top: 4px;
          margin-bottom: 4px;
          z-index: 0;
          position: relative;
          border-radius: ${borderRadius};
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            box-shadow .3s ${cubicBezierEaseInOut};
          overflow: hidden;
          background-color: ${color};
          box-shadow: ${boxShadow};
        `
      },
      [
        ['small', 'medium', 'large'].map((size) => {
          const {
            [createKey('optionFontSize', size)]: fontSize,
            [createKey('optionHeight', size)]: optionHeight,
            [createKey('padding', size)]: padding
          } = $local
          const groupHeaderFontSize = pxfy(depx(fontSize) - 2)
          const menuHeight = pxfy(depx(optionHeight) * 7.6)
          return cM(
            size + '-size',
            {
              padding
            },
            [
              cB('scrollbar', {
                maxHeight: menuHeight
              }),
              cB('virtual-list', {
                maxHeight: menuHeight
              }),
              cB('base-select-option', {
                height: optionHeight,
                lineHeight: optionHeight,
                fontSize: fontSize
              }),
              cB('base-select-group-header', {
                height: optionHeight,
                lineHeight: optionHeight,
                fontSize: groupHeaderFontSize
              })
            ]
          )
        }),
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
          position: 'relative',
          cursor: 'default',
          padding: '0 14px',
          color: groupHeaderTextColor
        }),
        cB(
          'base-select-option',
          {
            raw: `
              cursor: pointer;
              position: relative;
              padding: 0 14px;
              white-space: nowrap;
              transition:
                background-color .3s ${cubicBezierEaseInOut},
                color .3s ${cubicBezierEaseInOut},
                opacity .3s ${cubicBezierEaseInOut};
              text-overflow: ellipsis;
              overflow: hidden;
              box-sizing: border-box;
              color: ${optionTextColor};
              opacity: 1;
            `
          },
          [
            c('&:active', {
              color: optionTextColorPressed
            }),
            cM('grouped', {
              padding: '0 21px'
            }),
            cM('selected', {
              color: optionTextColorSelected
            }),
            cM(
              'disabled',
              {
                cursor: 'not-allowed'
              },
              [
                cNotM('selected', {
                  color: optionTextColorDisabled
                }),
                cM('selected', {
                  opacity: optionOpacityDisabled
                })
              ]
            ),
            cM('pending', {
              backgroundColor: optionColorPending
            })
          ]
        ),
        cM('multiple', [
          cB(
            'base-select-option',
            {
              position: 'relative',
              paddingRight: '28px'
            },
            [
              cM('selected', [
                c('&::after', {
                  opacity: 1,
                  transform: 'rotate(45deg) scale(1)'
                })
              ]),
              // TODO: use SVG icon
              c('&::after', {
                raw: `
                  content: '';
                  height: 8px;
                  width: 4px;
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
            ]
          )
        ])
      ]
    )
  }
])

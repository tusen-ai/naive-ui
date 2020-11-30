import { c, cTB, cE, cM, cNotM, cB, createKey } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      boxShadow,
      boxShadowActive,
      boxShadowFocus,
      boxShadowHover,
      boxShadowDisabled,
      color,
      colorDisabled,
      textColor,
      textColorDisabled,
      dotColorActive,
      dotColorDisabled
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$global
    return [
      cTB(
        'radio',
        {
          raw: `
            line-height: 1;
            outline: none;
            position: relative;
            user-select: none;
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
          `
        },
        [
          ['small', 'medium', 'large'].map(size => {
            const fontSize = props.$local[createKey('fontSize', size)]
            const radioSize = props.$local[createKey('radioSize', size)]
            return cM(`${size}-size`, {
              fontSize
            }, [
              cE('dot', {
                height: radioSize,
                width: radioSize
              })
            ])
          }),
          cE('radio-input', {
            raw: `
              border: 0;
              width: 0;
              height: 0;
              opacity: 0;
              margin: 0;
            `
          }),
          cE('dot', {
            raw: `
              transition:
              background-color .3s ${cubicBezierEaseInOut},
              box-shadow .3s ${cubicBezierEaseInOut};
              position: relative;
              border-radius: 50%;
            `,
            backgroundColor: color,
            boxShadow: boxShadow
          }
          , [
            c('&:not(:last-child)', {
              marginRight: '9px'
            }),
            c('&::before', {
              raw: `
                content: "";
                opacity: 0;
                position: absolute;
                left: 4px;
                top: 4px;
                height: calc(100% - 8px);
                width: calc(100% - 8px);
                border-radius: 50%;
                transform: scale(.8);
                transition: 
                  opacity .3s ${cubicBezierEaseInOut},
                  background-color .3s ${cubicBezierEaseInOut},
                  transform .3s ${cubicBezierEaseInOut};
              `,
              backgroundColor: dotColorActive
            }),
            cM('checked', {
              boxShadow: boxShadowActive
            }, [
              c('&::before', {
                raw: `
                  opacity: 1;
                  transform: scale(1);
                `
              })
            ])
          ]),
          cE('label', {
            raw: `
              display: inline-block;
              white-space: nowrap;
              transition: color .3s ${cubicBezierEaseInOut};
            `,
            color: textColor
          }),
          cNotM('disabled', {
            raw: `
              cursor: pointer;
            `
          }, [
            c('&:hover', [
              cE('dot', {
                boxShadow: boxShadowHover
              })
            ]),
            cM('focus', [
              c('&:not(:active)', [
                cE('dot', {
                  boxShadow: boxShadowFocus
                })
              ])
            ])
          ]),
          cM('disabled', {
            raw: `
              cursor: not-allowed;
            `
          }, [
            cE('dot', {
              boxShadow: boxShadowDisabled,
              backgroundColor: colorDisabled
            }, [
              c('&::before', {
                backgroundColor: dotColorDisabled
              }),
              cM('checked', {
                raw: `
                  transform: scale(1);
                  opacity: 1;
                `
              })
            ]),
            cE('label', {
              color: textColorDisabled
            })
          ])
        ]
      ),
      cTB('radio-group', {
        raw: `
          display: inline-block;
        `
      }, [
        cB('radio', {
          raw: `
            margin-right: 18px;
          `
        })
      ])
    ]
  }
])

import { c, cTB, cE, cM, cNotM, cB } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      boxShadowDefault,
      boxShadowActive,
      boxShadowFocus,
      boxShadowHover,
      boxShadowDisabled,
      backgroundColorDefault,
      backgroundColorDisabled,
      labelTextColorDefault,
      labelTextColorDisabled,
      controlBackgroundColorActive,
      controlBackgroundColorDisabled
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return [
      cTB(
        'radio',
        {
          raw: `
            line-height: 1.25;
            outline: none;
            position: relative;
            user-select: none;
            display: inline-flex;
            vertical-align: middle;
            align-items: center;
          `
        },
        [
          cE('radio-input', {
            raw: `
              width: 0;
              height: 0;
              opacity: 0;
              margin: 0;
            `
          }),
          cE('control', {
            raw: `
              transition:
              background-color .3s ${easeInOutCubicBezier},
              box-shadow .3s ${easeInOutCubicBezier};
              margin-right: 9px;
              position: relative;
              border-radius: 50%;
            `,
            backgroundColor: backgroundColorDefault,
            boxShadow: boxShadowDefault
          }
          , [
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
                  opacity .3s ${easeInOutCubicBezier},
                  background-color .3s ${easeInOutCubicBezier},
                  transform .3s ${easeInOutCubicBezier};
              `,
              backgroundColor: controlBackgroundColorActive
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
              transition: color .3s ${easeInOutCubicBezier};
            `,
            color: labelTextColorDefault
          }),
          cNotM('disabled', {
            raw: `
              cursor: pointer;
            `
          }, [
            c('&:hover', [
              cE('control', {
                boxShadow: boxShadowHover
              })
            ]),
            cM('focus', [
              c('&:not(:active)', [
                cE('control', {
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
            cE('control', {
              boxShadow: boxShadowDisabled,
              backgroundColor: backgroundColorDisabled
            }, [
              c('&::before', {
                backgroundColor: controlBackgroundColorDisabled
              }),
              cM('checked', {
                raw: `
                  transform: scale(1);
                  opacity: 1;
                `
              })
            ]),
            cE('label', {
              color: labelTextColorDisabled
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

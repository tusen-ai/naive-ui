import { c, cTB, cB, cE, cM, createKey } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      buttonBorderColor,
      buttonBorderColorActive,
      opacityDisabled
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return [
      cTB('radio-group', {
        display: 'inline-block'
      }, [
        cE('splitor', {
          raw: `
            display: inline-block;
            vertical-align: bottom;
            width: 1px;
            transition:
              background-color .3s ${cubicBezierEaseInOut},
              opacity .3s ${cubicBezierEaseInOut};
          `,
          backgroundColor: buttonBorderColor
        }, [
          cM('checked', {
            backgroundColor: buttonBorderColorActive
          }),
          cM('disabled', {
            opacity: opacityDisabled
          })
        ]),
        ['small', 'medium', 'large'].map(size => {
          const height = props.$local[createKey('buttonHeight', size)]
          return cM('button-group', {
            whiteSpace: 'nowrap'
          }, [
            cM(`${size}-size`, {
              height,
              lineHeight: height
            },
            [
              cB('radio-button', {
                height,
                lineHeight: height
              }),
              cE('splitor', {
                height
              })
            ])
          ])
        })
      ])
    ]
  }
])

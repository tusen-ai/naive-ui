import { c, cTB, cB, cE, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      buttonBorderColor,
      buttonBorderColorActive,
      opacityDisabled,
      height
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return [
      cTB('radio-group', {
        raw: `
          display: inline-block;
        `
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
          return cM('button-group', {
            raw: `
              white-space: nowrap;
            `
          }, [
            cM(`${size}-size`, {
              height: height[size],
              lineHeight: height[size]
            },
            [
              cB('radio-button', {
                height: height[size],
                lineHeight: height[size]
              }),
              cE('splitor', {
                height: height[size]
              })
            ])
          ])
        })
      ])
    ]
  }
])

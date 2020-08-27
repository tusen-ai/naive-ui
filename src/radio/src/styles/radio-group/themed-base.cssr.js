import { c, cTB, cE, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      buttonBorderColor,
      buttonBorderColorActive,
      disabledOpacity
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('radio-group', {
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
            background-color .3s ${easeInOutCubicBezier},
            opacity .3s ${easeInOutCubicBezier};
        `,
        backgroundColor: buttonBorderColor
      }, [
        cM('checked', {
          backgroundColor: buttonBorderColorActive
        }),
        cM('disabled', {
          opacity: disabledOpacity
        })
      ])
    ])
  }
])

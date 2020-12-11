import { c, cTB, cB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $local: {
        borderRadius,
        boxShadow,
        padding,
        color,
        textColor
      }
    } = props
    return cTB('popover', [
      cM('tooltip', {
        raw: `
          padding: ${padding};
          border-radius: ${borderRadius};
          box-shadow: ${boxShadow};
          background-color: ${color};
          color: ${textColor};
        `
      }, [
        cB('popover-arrow-wrapper', [
          cB('popover-arrow', {
            backgroundColor: color
          })
        ])
      ])
    ])
  }
])

import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      textColor,
      iconColor,
      extraTextColor
    } = props.$local
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    return [
      cTB('empty', {
        raw: `
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        `
      },
      [
        cE('icon', {
          raw: `
          transition: fill .3s ${easeInOutCubicBezier};
          `
        }, [
          cB('icon', {
            raw: `
            fill: ${iconColor};
            stroke: ${iconColor};
            `
          })
        ]),
        cE('description', {
          raw: `
          margin-top: 4px;
          transition: color .3s ${easeInOutCubicBezier};
          color: ${textColor};
          `
        }),
        cE('extra', {
          raw: `
          text-align: center;
          transition: color .3s ${easeInOutCubicBezier};
          margin-top: 16px;
          color: ${extraTextColor};
          `
        })
      ])
    ]
  }
])

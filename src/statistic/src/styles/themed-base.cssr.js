import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    const {
      labelFontWeight,
      valueFontWeight,
      valuePrefixTextColor,
      labelTextColor,
      valueSuffixTextColor,
      valueTextColor
    } = props.$local
    return cTB('statistic', [
      cE('label', {
        raw: `
          font-weight: ${labelFontWeight};
          transition: .3s color ${easeInOutCubicBezier};
          font-size: 14px;
        `,
        color: labelTextColor
      }),
      cB('statistic-value', {
        raw: `
          margin-top: 4px;
          font-weight: ${valueFontWeight};
        `
      }, [
        cE('prefix', {
          raw: `
            font-size: 18px;
            transition: .3s color ${easeInOutCubicBezier};
          `,
          color: valuePrefixTextColor
        }, [
          cB('icon', {
            raw: `
              vertical-align: -0.125em;
            `,
            fill: valuePrefixTextColor,
            stroke: valuePrefixTextColor
          })
        ]),
        cE('content', {
          raw: `
            font-size: 24px;
            transition: .3s color ${easeInOutCubicBezier};
          `,
          color: valueTextColor
        }),
        cE('suffix', {
          raw: `
            font-size: 18px;
            transition: .3s color ${easeInOutCubicBezier};
          `,
          color: valueSuffixTextColor
        }, [
          cB('icon', {
            raw: `
              vertical-align: -0.125em;
            `,
            fill: valueSuffixTextColor,
            stroke: valueSuffixTextColor
          })
        ])
      ])
    ])
  }
])

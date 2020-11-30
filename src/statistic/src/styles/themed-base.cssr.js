import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$global
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
          transition: .3s color ${cubicBezierEaseInOut};
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
            margin: 0 4px;
            font-size: 18px;
            transition: .3s color ${cubicBezierEaseInOut};
          `,
          color: valuePrefixTextColor
        }, [
          cB('icon', {
            verticalAlign: '-0.125em'
          })
        ]),
        cE('content', {
          raw: `
            font-size: 24px;
            transition: .3s color ${cubicBezierEaseInOut};
          `,
          color: valueTextColor
        }),
        cE('suffix', {
          raw: `
            font-size: 18px;
            transition: .3s color ${cubicBezierEaseInOut};
          `,
          color: valueSuffixTextColor
        }, [
          cB('icon', {
            verticalAlign: '-0.125em'
          })
        ])
      ])
    ])
  }
])

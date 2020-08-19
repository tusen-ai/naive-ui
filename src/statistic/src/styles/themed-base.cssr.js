import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier,
      strongFontWeight
    } = props.$base
    const {
      statisticValuePrefixTextColor,
      statisticValueLabelTextColor,
      statisticValueSuffixTextColor,
      statisticValueContentTextColor
    } = props.$local
    return cTB('statistic', [
      cE('label', {
        raw: `
          font-weight: ${strongFontWeight};
          transition: .3s color ${easeInOutCubicBezier};
          font-size: 14px;
        `,
        color: statisticValueLabelTextColor
      }),
      cB('statistic-value', {
        raw: `
          margin-top: 4px;
          font-weight: ${strongFontWeight};
        `
      }, [
        cE('prefix', {
          raw: `
            font-size: 18px;
            transition: .3s color ${easeInOutCubicBezier};
          `,
          color: statisticValuePrefixTextColor
        }, [
          cB('icon', {
            raw: `
              vertical-align: -0.125em;
            `,
            fill: statisticValuePrefixTextColor,
            stroke: statisticValuePrefixTextColor
          })
        ]),
        cE('content', {
          raw: `
            font-size: 24px;
            transition: .3s color ${easeInOutCubicBezier};
          `,
          color: statisticValueContentTextColor
        }),
        cE('suffix', {
          raw: `
            font-size: 18px;
            transition: .3s color ${easeInOutCubicBezier};
          `,
          color: statisticValueSuffixTextColor
        }, [
          cB('icon', {
            raw: `
              vertical-align: -0.125em;
            `,
            fill: statisticValueSuffixTextColor,
            stroke: statisticValueSuffixTextColor
          })
        ])
      ])
    ])
  }
])

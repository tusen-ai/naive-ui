import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const {
      default: linkDefaultColor,
      hover: linkHoverColor,
      active: linkActiveColor
    } = props.$local.linkTextColor
    const {
      default: seperateTextColor
    } = props.$local.seperatorTextColor
    return cTB(
      'breadcrumb', {
        whiteSpace: 'nowrap'
      }, [
        cB('breadcrumb-item', {
          transition: `
            color .3s ${easeInOutCubicBezier}
          `
        }, [
          cB('icon', {
            raw: `
              font-size: 16px;
              vertical-align: -.2em;
            `,
            fill: linkDefaultColor,
            stroke: linkDefaultColor
          }),
          cE('link', {
            raw: `
              cursor: pointer;
            `,
            transition: `color .3s ${easeInOutCubicBezier}`,
            color: linkDefaultColor
          }),
          cE('seperator', {
            margin: '0 4px',
            color: seperateTextColor,
            transition: `color .3s ${easeInOutCubicBezier}`
          }),
          c('&:hover', [
            cB('icon', {
              fill: linkHoverColor,
              stroke: linkHoverColor
            }),
            cE('link', {
              color: linkHoverColor
            })
          ]),
          c('&:last-child', [
            cE('link', {
              cursor: 'unset',
              color: linkActiveColor
            }),
            cB('icon', {
              fill: linkActiveColor,
              stroke: linkActiveColor
            }),
            cE('seperator', {
              display: 'none'
            })
          ])
        ])
      ]
    )
  }
])

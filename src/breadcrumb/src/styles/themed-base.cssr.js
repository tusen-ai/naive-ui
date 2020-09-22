import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
    const {
      separatorColor,
      itemTextColor,
      itemTextColorHover,
      itemTextColorActive,
      itemTextColorMatch
    } = props.$local
    return cTB(
      'breadcrumb', {
        whiteSpace: 'nowrap'
      }, [
        cB('breadcrumb-item', {
          transition: `
            color .3s ${cubicBezierEaseInOut}
          `
        }, [
          cB('icon', {
            raw: `
              font-size: 16px;
              vertical-align: -.2em;
            `,
            fill: itemTextColor,
            stroke: itemTextColor
          }),
          cE('link', {
            raw: `
              cursor: pointer;
            `,
            transition: `color .3s ${cubicBezierEaseInOut}`,
            color: itemTextColor
          }),
          cE('separator', {
            margin: '0 4px',
            color: separatorColor,
            transition: `color .3s ${cubicBezierEaseInOut}`
          }),
          c('&:hover', [
            cB('icon', {
              fill: itemTextColorHover,
              stroke: itemTextColorHover
            }),
            cE('link', {
              color: itemTextColorHover
            })
          ]),
          c('&:active', [
            cB('icon', {
              fill: itemTextColorActive,
              stroke: itemTextColorActive
            }),
            cE('link', {
              color: itemTextColorActive
            })
          ]),
          c('&:last-child', [
            cE('link', {
              cursor: 'unset',
              color: itemTextColorMatch
            }),
            cB('icon', {
              fill: itemTextColorMatch,
              stroke: itemTextColorMatch
            }),
            cE('separator', {
              display: 'none'
            })
          ])
        ])
      ]
    )
  }
])

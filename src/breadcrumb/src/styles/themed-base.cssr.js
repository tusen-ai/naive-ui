import { c, cTB, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
    const {
      separatorColor,
      itemTextColor,
      itemTextColorHover,
      itemTextColorPressed,
      itemTextColorActive,
      fontSize,
      fontWeightActive
    } = props.$local
    return cTB(
      'breadcrumb', {
        whiteSpace: 'nowrap'
      }, [
        cB('breadcrumb-item', {
          fontSize: fontSize,
          transition: `color .3s ${cubicBezierEaseInOut}`
        }, [
          cB('icon', {
            raw: `
              font-size: 18px;
              vertical-align: -.2em;
              transition: color .3s ${cubicBezierEaseInOut};
            `,
            color: itemTextColor
          }),
          cE('link', {
            cursor: 'pointer',
            transition: `color .3s ${cubicBezierEaseInOut}`,
            color: itemTextColor
          }),
          cE('separator', {
            margin: '0 6px',
            color: separatorColor,
            transition: `color .3s ${cubicBezierEaseInOut}`
          }),
          c('&:hover', [
            cB('icon', {
              color: itemTextColorHover
            }),
            cE('link', {
              color: itemTextColorHover
            })
          ]),
          c('&:active', [
            cB('icon', {
              color: itemTextColorPressed
            }),
            cE('link', {
              color: itemTextColorPressed
            })
          ]),
          c('&:last-child', [
            cE('link', {
              raw: `
                font-weight: ${fontWeightActive};
                cursor: unset;
              `,
              color: itemTextColorActive
            }),
            cB('icon', {
              color: itemTextColorActive
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

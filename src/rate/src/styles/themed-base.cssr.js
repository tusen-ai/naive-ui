import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      itemColor,
      itemColorActive
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('rate', {
      display: 'inline-flex',
      flexWrap: 'no-wrap'
    }, [
      cE('item', {
        transition: `transform .1s ${cubicBezierEaseInOut}`,
        transform: 'scale(1)'
      }, [
        c('&:hover', {
          transform: 'scale(1.05)'
        }, [
          cB('icon', {
            transition: `
              fill .1s ${cubicBezierEaseInOut},
              stroke .1s ${cubicBezierEaseInOut}
            `
          })
        ]),
        c('&:active', {
          transform: 'scale(0.96)'
        }),
        c('&:not(:first-child)', {
          marginLeft: '2px'
        }),
        cB('icon', {
          fontSize: '24px',
          cursor: 'pointer',
          fill: itemColor,
          stroke: itemColor
        }),
        cM('active', [
          cB('icon', {
            fill: itemColorActive,
            stroke: itemColorActive
          })
        ])
      ])
    ])
  }
])

import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      itemColor,
      itemColorActive
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$global
    return cTB('rate', {
      display: 'inline-flex',
      flexWrap: 'nowrap'
    }, [
      c('&:hover', [
        cB('icon', {
          transition: `
            color .1s ${cubicBezierEaseInOut}
          `
        })
      ]),
      cE('item', {
        display: 'flex',
        transition: `transform .1s ${cubicBezierEaseInOut}`,
        transform: 'scale(1)'
      }, [
        c('&:hover', {
          transform: 'scale(1.05)'
        }),
        c('&:active', {
          transform: 'scale(0.96)'
        }),
        c('&:not(:first-child)', {
          marginLeft: '6px'
        }),
        cB('icon', {
          fontSize: '20px',
          cursor: 'pointer',
          color: itemColor
        }),
        cM('active', [
          cB('icon', {
            color: itemColorActive
          })
        ])
      ])
    ])
  }
])

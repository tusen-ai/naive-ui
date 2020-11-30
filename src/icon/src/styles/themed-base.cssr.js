import { c, cTB, cM, cB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      color
    } = props.$local
    const { cubicBezierEaseInOut } = props.$global
    return [
      cTB('icon', {
        raw: `
          height: 1em;
          width: 1em;
          line-height: 1em;
          text-align: center;
          display: inline-block;
          position: relative;
          fill: currentColor;
        `
      },
      [
        cM('color-transition', {
          transition: `color .3s ${cubicBezierEaseInOut}`
        }),
        c('svg', {
          height: '1em',
          width: '1em',
          transition: `opacity .3s ${cubicBezierEaseInOut}`
        }),
        [1, 2, 3, 4, 5].map(v => cM(`${v}-depth`, {
          color
        }, [
          c('svg', {
            opacity: props.$local[`opacity${v}Depth`]
          })
        ]))
      ]),
      [1, 2, 3, 4, 5].map(v => cB(`icon-${v}-depth >`, [
        cTB('icon', {
          color
        }, [
          c('svg', {
            opacity: props.$local[`opacity${v}Depth`]
          })
        ])
      ]))
    ]
  }
])

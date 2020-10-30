import { c, cTB, cM, cB } from '../../../_utils/cssr'
import { changeColor } from '../../../_utils/color'

export default c([
  ({ props }) => {
    const {
      color
    } = props.$local
    const { cubicBezierEaseInOut } = props.$base
    return [
      cTB('icon', {
        raw: `
          height: 1em;
          width: 1em;
          line-height: 1em;
          text-align: center;
          display: inline-block;
          position: relative;
          transition:
            color .3s ${cubicBezierEaseInOut};
          fill: currentColor;
          stroke: currentColor;
        `
      },
      [
        cM('1-depth, 2-depth, 3-depth, 4-depth, 5-depth', {
          fill: color,
          stroke: color
        }),
        c('svg', {
          height: '1em',
          width: '1em'
        }),
        [1, 2, 3, 4, 5].map(v => cM(`${v}-depth`, {
          color: changeColor(color, { alpha: props.$local[`opacity${v}Depth`] })
        }))
      ]),
      [1, 2, 3, 4, 5].map(v => cB(`icon-${v}-depth >`, [
        cTB('icon', {
          color: changeColor(color, { alpha: props.$local[`opacity${v}Depth`] })
        })
      ]))
    ]
  }
])

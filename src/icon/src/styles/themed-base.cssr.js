import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      color,
      opacity1Depth,
      opacity2Depth,
      opacity3Depth
    } = props.$local
    const { cubicBezierEaseInOut, iconTransition } = props.$base
    return [
      cTB('icon', {
        raw: `
          height: 1em;
          width: 1em;
          line-height: 1em;
          text-align: center;
          display: inline-block;
          position: relative;
          transition: ${iconTransition};
          fill: ${color};
          stroke:  ${color};
        `
      },
      [
        c('svg', {
          raw: `
            transition: opacity .3s ${cubicBezierEaseInOut};
            height: 1em;
            width: 1em;
          `
        }),
        cM('primary-depth', [
          c('svg', {
            raw: `
              opacity: ${opacity1Depth};
            `
          })
        ]),
        cM('secondary-depth', [
          c('svg', {
            raw: `
              opacity: ${opacity2Depth};
            `
          })
        ]),
        cM('tertiary-depth', [
          c('svg', {
            raw: `
              opacity: ${opacity3Depth};
            `
          })
        ])
      ])
    ]
  }
])

import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      color,
      opacityPrimaryDepth,
      opacitySecondaryDepth,
      opacityTertiaryDepth
    } = props.$local
    const { easeInOutCubicBezier, iconTransition } = props.$base
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
            transition: opacity .3s ${easeInOutCubicBezier};
            height: 1em;
            width: 1em;
          `
        }),
        cM('primary-depth', [
          c('svg', {
            raw: `
              opacity: ${opacityPrimaryDepth};
            `
          })
        ]),
        cM('secondary-depth', [
          c('svg', {
            raw: `
              opacity: ${opacitySecondaryDepth};
            `
          })
        ]),
        cM('tertiary-depth', [
          c('svg', {
            raw: `
              opacity: ${opacityTertiaryDepth};
            `
          })
        ])
      ])
    ]
  }
])

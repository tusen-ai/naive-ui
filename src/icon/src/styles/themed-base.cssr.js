import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      baseTextColor,
      primaryOpacity,
      secondaryOpacity,
      tertiaryOpacity
    } = props.$local
    const base = props.$base
    const { easeInOutCubicBezier, iconTransition } = base
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
          fill: ${baseTextColor};
          stroke:  ${baseTextColor};
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
              opacity: ${primaryOpacity}
            `
          })
        ]),
        cM('secondary-depth', [
          c('svg', {
            raw: `
              opacity: ${secondaryOpacity}
            `
          })
        ]),
        cM('tertiary-depth', [
          c('svg', {
            raw: `
              opacity: ${tertiaryOpacity}
            `
          })
        ])
      ])
    ]
  }
])

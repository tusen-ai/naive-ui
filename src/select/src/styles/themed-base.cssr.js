import { cTB, c, cB, cM, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const { easeInOutCubicBezier, transformDebounceScale } = props.$base
    return [
      cTB('select', {
        raw: `
          display: inline-block;
          border: none;
          outline: none;
          width: 100%;
          z-index: auto;
          text-align: start;
          vertical-align: baseline;
        `
      }, [
        cNotM('multiple', [
          cM('small-size', {
            raw: `
              height: 28px;
            `
          }),
          cM('medium-size', {
            raw: `
              eight: 34px;
            `
          }),
          cM('large-size', {
            raw: `
              height: 40px;
            `
          })
        ]),
        cM('small-size', {
          raw: `
            height: 28px;
            font-size: 14px;
          `
        }),
        cM('medium-size', {
          raw: `
            line-height: 34px;
            font-size: 14px;
          `
        }),
        cM('large-size', {
          raw: `
            line-height: 40px;
            font-size: 15px;
          `
        })
      ]),
      cB('select-menu', {
        raw: `
          transform: ${transformDebounceScale};
        `
      }, [
        fadeInScaleUpTransition({
          originalTransition: `background-color .3s ${easeInOutCubicBezier}`
        })
      ])
    ]
  }
])

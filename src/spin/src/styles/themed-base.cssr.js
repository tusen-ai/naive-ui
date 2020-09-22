import { c, cM, cTB, cB } from '../../../_utils/cssr'
import fadeInTransition from '../../../styles/_transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      opacitySpinning
    } = props.$local
    return cTB('spin-container', {
      raw: `
        position: relative;
      `
    }, [
      cB('spin', {
        raw: `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        `
      }, [
        fadeInTransition()
      ]),
      cB('spin-content', {
        raw: `
          opacity: 1;
          transition: opacity .3s ${cubicBezierEaseInOut};
          pointer-events: all;
        `
      }, [
        cM('spinning', {
          raw: `
            pointer-events: none;
          `,
          opacity: opacitySpinning
        })
      ])
    ])
  }
])

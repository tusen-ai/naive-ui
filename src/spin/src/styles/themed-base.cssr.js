import { c, cM, cTB, cB, createKey } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      opacitySpinning
    } = props.$local
    return [
      cTB('spin-container', {
        position: 'relative'
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
            pointerEvents: 'none',
            opacity: opacitySpinning
          })
        ])
      ]),
      cTB('spin', {
        display: 'inline-block'
      }, ['small', 'medium', 'large'].map(size => {
        const height = props.$local[createKey('height', size)]
        return cM(`${size}-size`, {
          height,
          width: height
        })
      }))
    ]
  }
])

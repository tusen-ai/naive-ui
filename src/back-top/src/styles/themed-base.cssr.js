import { c, cE, cTB, cM } from '../../../_utils/cssr'
import fadeInScaleIpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      backTopButtonFill,
      backTopBoxShadow
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base

    return cTB('back-top', {
      raw: `
        position: fixed;
        right: 40px;
        bottom: 40px;
        min-width: 40px;
        height: 40px;
        cursor: pointer;
      `
    }, [
      fadeInScaleIpTransition(),
      cM('transition-disabled', {
        transition: 'none !important'
      }),
      cE('default-button', {
        raw: `
          transition: box-shadow .3s ${easeInOutCubicBezier}, fill .3s ${easeInOutCubicBezier};
          border-radius: 20px;
          height: 40px;
          width: 40px;
          fill: ${backTopButtonFill['default']};
          box-shadow: ${backTopBoxShadow['default']};
        `
      }, [
        c('svg', {
          raw: `
            pointer-events: none;
          `
        }),
        c('&:hover', {
          raw: `
            box-shadow: ${backTopBoxShadow['hover']};
            fill: ${backTopButtonFill['hover']};
          `
        }),
        c('&:active', {
          raw: `
            box-shadow: ${backTopBoxShadow['active']};
            fill: ${backTopButtonFill['active']};
          `
        })
      ])
    ])
  }])

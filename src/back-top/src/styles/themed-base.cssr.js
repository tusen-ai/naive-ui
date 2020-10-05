import { c, cE, cTB, cM } from '../../../_utils/cssr'
import fadeInScaleIpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      backTopFill,
      backTopFillHover,
      backTopFillActive,
      backTopBoxShadow,
      backTopBoxShadowHover,
      backTopBoxShadowActive
    } = props.$local
    const {
      cubicBezierEaseInOut
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
          transition: box-shadow .3s ${cubicBezierEaseInOut}, fill .3s ${cubicBezierEaseInOut};
          border-radius: 20px;
          height: 40px;
          width: 40px;
          fill: ${backTopFill};
          box-shadow: ${backTopBoxShadow};
        `
      }, [
        c('svg', {
          raw: `
            pointer-events: none;
          `
        }),
        c('&:hover', {
          raw: `
            box-shadow: ${backTopBoxShadowHover};
            fill: ${backTopFillHover};
          `
        }),
        c('&:active', {
          raw: `
            box-shadow: ${backTopBoxShadowActive};
            fill: ${backTopFillActive};
          `
        })
      ])
    ])
  }])

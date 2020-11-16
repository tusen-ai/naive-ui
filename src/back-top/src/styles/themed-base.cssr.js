import { c, cE, cTB, cM } from '../../../_utils/cssr'
import fadeInScaleIpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      color,
      colorHover,
      colorActive,
      boxShadow,
      boxShadowHover,
      boxShadowPressed
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
        transition:
          color .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut};
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
          fill: ${color};
          box-shadow: ${boxShadow};
        `
      }, [
        c('svg', {
          pointerEvents: 'none'
        }),
        c('&:hover', {
          raw: `
            box-shadow: ${boxShadowHover};
            fill: ${colorHover};
          `
        }),
        c('&:active', {
          raw: `
            box-shadow: ${boxShadowPressed};
            fill: ${colorActive};
          `
        })
      ])
    ])
  }])

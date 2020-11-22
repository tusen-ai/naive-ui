import { c, cB, cTB, cM } from '../../../_utils/cssr'
import fadeInScaleIpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      color,
      boxShadow,
      boxShadowHover,
      boxShadowPressed,
      iconColor,
      iconColorHover,
      iconColorPressed,
      width,
      height,
      iconSize,
      borderRadius
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base

    return cTB('back-top', {
      raw: `
        position: fixed;
        right: 40px;
        bottom: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          color .3s ${cubicBezierEaseInOut},
          box-shadow .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut};
        border-radius: ${borderRadius};
        height: ${height};
        min-width: ${width};
        box-shadow: ${boxShadow};
        background-color: ${color};
      `
    }, [
      fadeInScaleIpTransition(),
      cM('transition-disabled', {
        transition: 'none !important'
      }),
      cB('icon', {
        raw: `
          font-size: ${iconSize};
          fill: ${iconColor}
        `
      }),
      c('svg', {
        raw: `
          pointer-events: none;
        `
      }),
      c('&:hover', {
        raw: `
          box-shadow: ${boxShadowHover};
        `
      }, [
        cB('icon', {
          fill: iconColorHover,
          stroke: iconColorHover
        })
      ]),
      c('&:active', {
        raw: `
          box-shadow: ${boxShadowPressed};
        `
      }, [
        cB('icon', {
          fill: iconColorPressed,
          stroke: iconColorPressed
        })
      ])
    ])
  }])

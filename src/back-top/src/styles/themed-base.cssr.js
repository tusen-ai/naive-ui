import { c, cB, cTB, cM } from '../../../_utils/cssr'
import fadeInScaleIpTransition from '../../../_styles/transitions/fade-in-scale-up'

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
    } = props.$global

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
          color: ${iconColor};
          transition: color .3s ${cubicBezierEaseInOut};
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
          color: iconColorHover
        })
      ]),
      c('&:active', {
        raw: `
          box-shadow: ${boxShadowPressed};
        `
      }, [
        cB('icon', {
          color: iconColorPressed
        })
      ])
    ])
  }])

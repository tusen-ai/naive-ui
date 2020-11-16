import { c, cTB, cB, cM, cNotM } from '../../../_utils/cssr'
import slideInFromRightTransition from '../../../_styles/transitions/slide-in-from-right'
import slideInFromLeftTransition from '../../../_styles/transitions/slide-in-from-left'
import slideInFromTopTransition from '../../../_styles/transitions/slide-in-from-top'
import slideInFromBottomTransition from '../../../_styles/transitions/slide-in-from-bottom'
import fadeInTransition from '../../../_styles/transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      color: backgroundColor,
      textColor,
      boxShadow
    } = props.$local
    const {
      cubicBezierEaseInOut,
      cubicBezierEaseIn,
      cubicBezierEaseOut
    } = props.$base
    return [
      cTB('drawer', {
        raw: `
          overflow: auto;
          position: absolute;
          pointer-events: all;
          box-shadow: ${boxShadow};
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut};
        `,
        backgroundColor,
        color: textColor
      },
      [
        slideInFromRightTransition(),
        slideInFromLeftTransition(),
        slideInFromTopTransition(),
        slideInFromBottomTransition(),
        cM('native-scrollbar', {
          boxSizing: 'border-box',
          padding: '16px 24px'
        }),
        cNotM('native-scrollbar', [
          cB('drawer-scroll-content', {
            boxSizing: 'border-box',
            padding: '16px 24px'
          })
        ]),
        cM('right-placement', {
          raw: `
            top: 0;
            bottom: 0;
            right: 0;
          `
        }),
        cM('left-placement', {
          raw: `
            top: 0;
            bottom: 0;
            left: 0;
          `
        }),
        cM('top-placement', {
          raw: `
            top: 0;
            left: 0;
            right: 0;
          `
        }),
        cM('bottom-placement', {
          raw: `
            left: 0;
            bottom: 0;
            right: 0;
          `
        })
      ]),
      cB('drawer-mask', {
        raw: `
          background-color: rgba(0, 0, 0, .3);
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: all;
        `
      }, [
        fadeInTransition({
          enterDuration: '0.3s',
          leaveDuration: '0.3s',
          enterCubicBezier: cubicBezierEaseIn,
          leaveCubicBezier: cubicBezierEaseOut
        })
      ]),
      cB('drawer-container', {
        raw: `
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        `
      })
    ]
  }
])

import { c, cTB, cB, cM } from '../../../_utils/cssr'
import slideInFromRightTransition from '../../../styles/_transitions/slide-in-from-right'
import slideInFromLeftTransition from '../../../styles/_transitions/slide-in-from-left'
import slideInFromTopTransition from '../../../styles/_transitions/slide-in-from-top'
import slideInFromBottomTransition from '../../../styles/_transitions/slide-in-from-bottom'
import fadeInTransition from '../../../styles/_transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      color: backgroundColor,
      textColor
    } = props.$local
    const base = props.$base
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
    return [
      cTB('drawer', {
        raw: `
          position: absolute;
          pointer-events: all;
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
        cB('drawer-content', {
          boxSizing: 'border-box',
          padding: '16px 24px'
        }),
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
          leaveDuration: '0.3s'
        })
      ]),
      cB('darwer-container', {
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

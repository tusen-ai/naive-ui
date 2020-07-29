import { c, cTB, cM } from '../../../_utils/cssr'
import slideInFromRightTransition from '../../../styles/_transitions/slide-in-from-right'
import slideInFromLeftTransition from '../../../styles/_transitions/slide-in-from-left'
import slideInFromTopTransition from '../../../styles/_transitions/slide-in-from-top'
import slideInFromBottomTransition from '../../../styles/_transitions/slide-in-from-bottom'
import fadeInTransition from '../../../styles/_transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      backgroundColor,
      textColor
    } = props.$local
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    return [
      cTB('drawer', {
        raw: `
          padding: 16px 24px;
          position: absolute;
          pointer-events: all;
          transition:
            background-color .3s ${easeInOutCubicBezier},
            color .3s ${easeInOutCubicBezier};
        `,
        backgroundColor,
        textColor
      },
      [
        slideInFromRightTransition(),
        slideInFromLeftTransition(),
        slideInFromTopTransition(),
        slideInFromBottomTransition(),
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
      cTB('drawer-overlay', {
        raw: `
          background-color: rgba(0, 0, 0, .3);
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: all;
        `
      }),
      c('drawer-overlay', {
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
          name: 'drawer-overlay',
          enterDuration: '0.3s',
          leaveDuration: '0.3s'
        })
      ]),
      c('darwer-container', {
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

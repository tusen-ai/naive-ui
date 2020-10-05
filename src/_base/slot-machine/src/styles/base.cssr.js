import { c, cB, cE, cM } from '../../../../_utils/cssr'
import fadeInWidthExpandTransition from '../../../../_styles/transitions/fade-in-width-expand'
import fadeUpWidthExpandTransition from '../../../../_styles/transitions/fade-up-width-expand'

export default c([
  ({ props }) => [
    c('@keyframes n-base-slot-machine-fade-up-in', {
      raw: `
        from {
          transform: translateY(60%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      `
    }),
    c('@keyframes n-base-slot-machine-fade-down-in', {
      raw: `
        from {
          transform: translateY(-60%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      `
    }),
    c('@keyframes n-base-slot-machine-fade-up-out', {
      raw: `
        from {
          transform: translateY(0%);
          opacity: 1;
        }
        to {
          transform: translateY(-60%);
          opacity: 0;
        }
      `
    }),
    c('@keyframes n-base-slot-machine-fade-down-out', {
      raw: `
        from {
          transform: translateY(0%);
          opacity: 1;
        }
        to {
          transform: translateY(60%);
          opacity: 0;
        }
      `
    }),
    cB('base-slot-machine', {
      raw: `
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        height: 18px;
        line-height: 18px;
      `
    },
    [
      cB('base-slot-machine-number', {
        raw: `
          display: inline-block;
          position: relative;
          height: 18px;
          width: .6em;
          max-width: .6em;
        `
      }, [
        fadeUpWidthExpandTransition({ duration: '.2s' }),
        // use 0s, not 0
        fadeInWidthExpandTransition({ duration: '.2s', delay: '0s' }),
        cB('base-slot-machine-old-number', {
          raw: `
            display: inline-block;
            opacity: 0;
            position: absolute;
            left: 0;
            right: 0;
          `
        }, [
          cM('top', {
            transform: 'translateY(-100%)'
          }),
          cM('bottom', {
            transform: 'translateY(100%)'
          }),
          cM('down-scroll', {
            animation: `n-base-slot-machine-fade-down-out .2s ${props.$base.cubicBezierEaseOut}`,
            animationIterationCount: 1
          }),
          cM('up-scroll', {
            animation: `n-base-slot-machine-fade-up-out .2s ${props.$base.cubicBezierEaseOut}`,
            animationIterationCount: 1
          })
        ]),
        cB('base-slot-machine-current-number', {
          raw: `
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            opacity: 1;
            transform: translateY(0);
            width: .6em;
          `
        }, [
          cM('down-scroll', {
            animation: `n-base-slot-machine-fade-down-in .2s ${props.$base.cubicBezierEaseOut}`,
            animationIterationCount: 1
          }),
          cM('up-scroll', {
            animation: `n-base-slot-machine-fade-up-in .2s ${props.$base.cubicBezierEaseOut}`,
            animationIterationCount: 1
          }),
          cE('inner', {
            raw: `
              display: inline-block;
              position: absolute;
              right: 0;
              top: 0;
              width: .6em;
            `
          }, [
            cM('not-number', {
              raw: `
                right: unset;
                left: 0;
              `
            })
          ])
        ])
      ])
    ])
  ]
])

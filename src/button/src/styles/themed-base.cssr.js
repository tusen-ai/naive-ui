import { c, cTB2, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInWidthExpandTransition from '../../../styles/_transitions/fade-in-width-expand'

export default c([
  ({ props }) => {
    const local = props.$local
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    return cTB2(
      'button',
      {
        raw: `
          box-sizing: border-box;
          outline: none;
          position: relative;
          z-index: auto;
          border: none;
          font-family: inherit;
          display: inline-block;
          align-items: center;
          justify-content: center;
          user-select: none;
          text-align: center;
          cursor: pointer;
          transition:
            background-color .3s ${easeInOutCubicBezier},
            opacity .3s ${easeInOutCubicBezier},
            border-color .3s ${easeInOutCubicBezier};
        `
      },
      [
        cB('base-wave', {
          top: '-1px',
          right: '-1px',
          bottom: '-1px',
          left: '-1px',
          animationIterationCount: 1,
          animationDuration: props.$local.waveDuration,
          animationTimingFunction: `${base.easeOutCubicBezier}, ${base.easeOutCubicBezier}`
        }),
        c('&::after', {
          raw: `
            pointer-events: none;
            content: "";
            border-radius: inherit;
            position: absolute;
            left: -1px;
            top: -1px;
            right: -1px;
            bottom: -1px;
          `
        }),
        c('&::moz-focus-inner', {
          border: 0
        }),
        cE('border-mask', {
          raw: `
            position: absolute;
            left: -1px;
            top: -1px;
            right: -1px;
            bottom: -1px;
            border-radius: inherit;
            box-shadow: inset 0 0 0 1px transparent;
            transition: box-shadow .3s ${easeInOutCubicBezier};
            pointer-events: none;
            z-index: 1;
          `
        }),
        cE('icon', {
          transition: `color .3s ${easeInOutCubicBezier}`
        }, [
          fadeInWidthExpandTransition()
        ]),
        cE('content', {
          raw: `
            white-space: nowrap;
            transition: color .3s ${easeInOutCubicBezier};
          `
        }),
        cM('left-icon', [
          cE('icon', {
            marginRight: '6px'
          })
        ]),
        cM('right-icon', [
          cE('icon', {
            marginLeft: '6px'
          })
        ]),
        cM('block', {
          raw: `
            display: block;
            width: 100%;
          `
        }),
        cM('disabled', {
          cursor: 'not-allowed'
        }),
        cNotM('disabled', [
          cM('rippling', [
            c('&::after', {
              raw: `
                z-index: 1;
                animation-duration: .6s;
                animation-timing-function: cubic-bezier(0, .4, .5, .9), cubic-bezier(.5, .2, .8, .5);
              `
            })
          ])
        ]),
        cM('text', {
          raw: `
            border: none !important;
            background-color: transparent !important;
          `
        }, [
          cE('border-mask', {
            raw: `box-shadow: none !important;`
          })
        ]),
        cM('disabled', {
          opacity: local.disabledOpacity
        })
      ]
    )
  }
])

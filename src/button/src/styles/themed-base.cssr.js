import { c, cTB, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInWidthExpandTransition from '../../../styles/_transitions/fade-in-width-expand'
import iconSwitchTransition from '../../../styles/_transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      waveDuration,
      opacityDisabled,
      textColorPrimary
    } = props.$local
    const {
      cubicBezierEaseInOut,
      cubicBezierEaseOut
    } = props.$base
    return cTB(
      'button',
      {
        raw: `
          white-space: nowrap;
          box-sizing: border-box;
          outline: none;
          position: relative;
          z-index: auto;
          border: none;
          border-width: 1px;
          border-style: solid;
          font-family: inherit;
          display: inline-block;
          align-items: center;
          justify-content: center;
          user-select: none;
          text-align: center;
          cursor: pointer;
          color: ${textColorPrimary};
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            opacity .3s ${cubicBezierEaseInOut},
            border-color .3s ${cubicBezierEaseInOut};
        `
      },
      [
        cB('base-wave', {
          top: '-1px',
          right: '-1px',
          bottom: '-1px',
          left: '-1px',
          animationIterationCount: 1,
          animationDuration: waveDuration,
          animationTimingFunction: `${cubicBezierEaseOut}, ${cubicBezierEaseOut}`
        }),
        c('&::moz-focus-inner', {
          border: 0
        }),
        cE('border-mask', {
          raw: `
            border-style: solid;
            position: absolute;
            left: -1px;
            top: -1px;
            right: -1px;
            bottom: -1px;
            border-radius: inherit;
            border-width: 1px;
            border-color: transparent;
            transition: border-color .3s ${cubicBezierEaseInOut};
            pointer-events: none;
            z-index: 1;
          `
        }),
        cE('icon', {
          verticalAlign: 'bottom',
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          transition: `color .3s ${cubicBezierEaseInOut}`
        }, [
          cB('base-loading', {
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'block',
            fill: 'currentColor',
            stroke: 'currentColor'
          }, [
            iconSwitchTransition({
              top: '50%',
              originalTransform: 'translateY(-50%)'
            })
          ]),
          cB('icon', {
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'block',
            fill: 'currentColor',
            stroke: 'currentColor'
          }, [
            iconSwitchTransition({
              top: '50%',
              originalTransform: 'translateY(-50%)'
            })
          ]),
          fadeInWidthExpandTransition()
        ]),
        cE('content', {
          raw: `
            display: inline-block;
            line-height: inherit;
            white-space: nowrap;
            transition: color .3s ${cubicBezierEaseInOut};
          `
        }),
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
            raw: `border: none !important;`
          })
        ]),
        cM('disabled', {
          opacity: opacityDisabled
        })
      ]
    )
  }
])

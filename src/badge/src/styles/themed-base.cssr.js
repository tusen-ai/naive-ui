import { c, cTB, cB, cM, createKey } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

function createRippleAnimation () {
  return [
    c('@keyframes badge-wave-spread', {
      from: {
        boxShadow: '0 0 0.5px 0px var(--ripple-color)',
        opacity: 0.6
      },
      to: {
        // don't use exact 5px since chrome will display the animation with glitches
        boxShadow: '0 0 0.5px 4.5px var(--ripple-color)',
        opacity: 0
      }
    })
  ]
}

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut, cubicBezierEaseOut } = props.$global
    return [
      cTB('badge', {
        display: 'inline-flex',
        position: 'relative',
        verticalAlign: 'middle'
      }, [
        ['info', 'success', 'warning', 'error', 'default'].map(type => {
          const color = props.$local[createKey('color', type)]
          return cM(type + '-type', {
            '--color': color,
            '--ripple-color': color
          }, [
            cB('badge-sup', {
              background: 'var(--color)'
            })
          ])
        }),
        cM('as-is', [
          cB('badge-sup', {
            position: 'static',
            transform: 'translateX(0)'
          }, [
            fadeInScaleUpTransition({
              transformOrigin: 'left bottom',
              originalTransform: 'translateX(0)'
            })
          ])
        ]),
        cM('dot', [
          cB('badge-sup', {
            height: '8px',
            width: '8px',
            padding: 0,
            minWidth: '8px',
            left: '100%',
            bottom: 'calc(100% - 4px)'
          }, [
            c('::before', {
              borderRadius: '4px'
            })
          ])
        ]),
        cB('badge-sup', {
          raw: `
            transition:
              background-color .3s ${cubicBezierEaseInOut},
              color .3s ${cubicBezierEaseInOut};
            color: #FFF;
            position: absolute;
            height: 18px;
            line-height: 18px;
            border-radius: 9px;
            padding: 0 6px;
            text-align: center;
            font-size: 12px;
            transform: translateX(-50%);
            left: 100%;
            bottom: calc(100% - 9px);
          `,
          fontVariantNumeric: 'tabular-nums'
        }, [
          fadeInScaleUpTransition({
            transformOrigin: 'left bottom',
            originalTransform: 'translateX(-50%)'
          }),
          cB('base-wave', {
            zIndex: 1,
            animationDuration: '2s',
            animationIterationCount: 'infinite',
            animationDelay: '1s',
            animationTimingFunction: `${cubicBezierEaseOut}`,
            animationName: 'badge-wave-spread'
          }),
          c('&::before', {
            raw: `
              opacity: 0;
              transform: scale(1);
              border-radius: 9px;
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
            `
          })
        ])
      ]),
      createRippleAnimation()
    ]
  }
])

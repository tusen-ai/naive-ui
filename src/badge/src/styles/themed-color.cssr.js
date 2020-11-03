import { c, cTB, cB, cM, createKey } from '../../../_utils/cssr'

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
    const type = props.$instance.type
    const color = props.$local[createKey('color', type)]
    const { cubicBezierEaseOut } = props.$base
    return [
      createRippleAnimation(),
      cTB('badge', [
        cM(type + '-type', {
          '--color': color,
          '--ripple-color': color
        }, [
          cB('badge-sup', {
            background: 'var(--color)'
          }, [
            cB('base-wave', {
              zIndex: 1,
              animationDuration: '2s',
              animationIterationCount: 'infinite',
              animationDelay: '1s',
              animationTimingFunction: `${cubicBezierEaseOut}`,
              animationName: 'badge-wave-spread'
            })
          ])
        ])
      ])
    ]
  }
])

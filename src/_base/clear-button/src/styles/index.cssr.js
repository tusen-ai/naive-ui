import { cB, c, cE } from '../../../../_utils/cssr'
import createIconSwitchTransition from '../../../../_styles/transitions/icon-switch'

// vars:
// --cb-bezier
// --cb-color
// --cb-size
// --cb-color-hover
// --cb-color-pressed
export default cB('base-clear-button', {
  flexShrink: 0,
  height: '1em',
  width: '1em',
  position: 'relative'
}, [
  c('>', [
    cE('clear', {
      fontSize: 'var(--cb-size)!important',
      cursor: 'pointer',
      color: 'var(--cb-color)!important',
      transition: 'color .3s var(--cb-bezier)!important'
    }, [
      c('&:hover', {
        color: 'var(--cb-color-hover)!important'
      }),
      c('&:active', {
        color: 'var(--cb-color-pressed)!important'
      })
    ]),
    cE('placeholder', {
      display: 'flex'
    }),
    cE('clear, placeholder', {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    }, [
      createIconSwitchTransition({
        originalTransform: 'translateX(-50%) translateY(-50%)',
        left: '50%',
        top: '50%'
      })
    ])
  ])
])

import { c, cB, cM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-bezier
// --n-border-radius
// --n-height
// --n-width
// --n-box-shadow
// --n-box-shadow-hover
// --n-box-shadow-pressed
// --n-color
// --n-icon-size
// --n-icon-color
// --n-icon-color-hover
// --n-icon-color-pressed
// --n-text-color
export default cB('back-top', `
  position: fixed;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-color);
  transition:
    color .3s var(--n-bezier),
    box-shadow .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
  border-radius: var(--n-border-radius);
  height: var(--n-height);
  min-width: var(--n-width);
  box-shadow: var(--n-box-shadow);
  background-color: var(--n-color);
`, [
  fadeInScaleUpTransition(),
  cM('transition-disabled', {
    transition: 'none !important'
  }),
  cB('base-icon', `
    font-size: var(--n-icon-size);
    color: var(--n-icon-color);
    transition: color .3s var(--n-bezier);
  `),
  c('svg', {
    pointerEvents: 'none'
  }),
  c('&:hover', {
    boxShadow: 'var(--n-box-shadow-hover)'
  }, [
    cB('base-icon', {
      color: 'var(--n-icon-color-hover)'
    })
  ]),
  c('&:active', {
    boxShadow: 'var(--n-box-shadow-pressed)'
  }, [
    cB('base-icon', {
      color: 'var(--n-icon-color-pressed)'
    })
  ])
])

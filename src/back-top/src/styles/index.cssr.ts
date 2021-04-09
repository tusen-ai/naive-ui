import { c, cB, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --bezier
// --border-radius
// --height
// --width
// --box-shadow
// --box-shadow-hover
// --box-shadow-pressed
// --color
// --icon-size
// --icon-color
// --icon-color-hover
// --icon-color-pressed
// --text-color
export default cB('back-top', `
  position: fixed;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition:
    color .3s var(--bezier),
    box-shadow .3s var(--bezier),
    background-color .3s var(--bezier);
  border-radius: var(--border-radius);
  height: var(--height);
  min-width: var(--width);
  box-shadow: var(--box-shadow);
  background-color: var(--color);
`, [
  fadeInScaleUpTransition(),
  cM('transition-disabled', {
    transition: 'none !important'
  }),
  cB('base-icon', `
    font-size: var(--icon-size);
    color: var(--icon-color);
    transition: color .3s var(--bezier);
  `),
  c('svg', {
    pointerEvents: 'none'
  }),
  c('&:hover', {
    boxShadow: 'var(--box-shadow-hover)'
  }, [
    cB('base-icon', {
      color: 'var(--icon-color-hover)'
    })
  ]),
  c('&:active', {
    boxShadow: 'var(--box-shadow-pressed)'
  }, [
    cB('base-icon', {
      color: 'var(--icon-color-pressed)'
    })
  ])
])

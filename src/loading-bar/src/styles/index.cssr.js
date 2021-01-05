import { cB, cM } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in'

// vars:
// --height
// --color-loading
// --color-error
export default cB('loading-bar-container', `
  z-index: 5999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
`, [
  fadeInTransition({
    enterDuration: '0.3s',
    leaveDuration: '0.8s'
  }),
  cB('loading-bar', `
    width: 100%;
    transition:
      max-width 4s linear,
      background-color .2s linear;
    height: var(--height);
  `, [
    cM('starting', `
      background-color: var(--color-loading);
    `),
    cM('finishing', `
      background-color: var(--color-loading);
      transition:
        max-width .2s linear,
        background-color .2s linear;
    `),
    cM('error', `
      background-color: var(--color-error);
      transition:
        max-width .2s linear,
        background-color .2s linear;
    `)
  ])
])

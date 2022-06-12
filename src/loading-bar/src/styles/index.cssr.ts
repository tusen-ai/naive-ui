import { cB, cM } from '../../../_utils/cssr'
import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --n-height
// --n-color-loading
// --n-color-error
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
      background .2s linear;
    height: var(--n-height);
  `, [
    cM('starting', `
      background: var(--n-color-loading);
    `),
    cM('finishing', `
      background: var(--n-color-loading);
      transition:
        max-width .2s linear,
        background .2s linear;
    `),
    cM('error', `
      background: var(--n-color-error);
      transition:
        max-width .2s linear,
        background .2s linear;
    `)
  ])
])

import { cB, c, cE } from '../../../../_utils/cssr'
import { iconSwitchTransition } from '../../../../_styles/transitions/icon-switch.cssr'

// vars:
// --n-bezier
// --n-clear-color
// --n-clear-size
// --n-clear-color-hover
// --n-clear-color-pressed
export default cB('base-clear', `
  flex-shrink: 0;
  height: 1em;
  width: 1em;
  position: relative;
`, [
  c('>', [
    cE('clear', `
      font-size: var(--n-clear-size);
      height: 1em;
      width: 1em;
      cursor: pointer;
      color: var(--n-clear-color);
      transition: color .3s var(--n-bezier);
      display: flex;
    `, [
      c('&:hover', `
        color: var(--n-clear-color-hover)!important;
      `),
      c('&:active', `
        color: var(--n-clear-color-pressed)!important;
      `)
    ]),
    cE('placeholder', `
      display: flex;
    `),
    cE('clear, placeholder', `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    `, [
      iconSwitchTransition({
        originalTransform: 'translateX(-50%) translateY(-50%)',
        left: '50%',
        top: '50%'
      })
    ])
  ])
])

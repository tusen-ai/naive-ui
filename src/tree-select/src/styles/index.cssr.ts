import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-menu-height
// --n-menu-border-radius
// --n-menu-box-shadow
// --n-menu-color
// --n-action-padding
// --n-action-text-color
// --n-action-divider-color
export default c([
  cB('tree-select', `
    z-index: auto;
    outline: none;
    width: 100%;
    position: relative;
  `),
  cB('tree-select-menu', `
    position: relative;
    overflow: hidden;
    margin: 4px 0;
    transition: box-shadow .3s var(--n-bezier), background-color .3s var(--n-bezier);
    border-radius: var(--n-menu-border-radius);
    box-shadow: var(--n-menu-box-shadow);
    background-color: var(--n-menu-color);
    outline: none;
  `, [
    cB('tree', 'max-height: var(--n-menu-height);'),
    cE('empty', `
      display: flex;
      padding: 12px 32px;
      flex: 1;
      justify-content: center;
    `),
    cE('action', `
      padding: var(--n-action-padding);
      transition: 
        color .3s var(--n-bezier);
        border-color .3s var(--n-bezier);
      border-top: 1px solid var(--n-action-divider-color);
      color: var(--n-action-text-color);
    `),
    fadeInScaleUpTransition()
  ])
])

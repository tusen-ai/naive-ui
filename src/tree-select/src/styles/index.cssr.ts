import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --bezier
// --menu-height
// --menu-border-radius
// --menu-box-shadow
// --menu-color
// --action-padding
// --action-text-color
// --action-divider-color
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
    transition: box-shadow .3s var(--bezier), background-color .3s var(--bezier);
    border-radius: var(--menu-border-radius);
    box-shadow: var(--menu-box-shadow);
    background-color: var(--menu-color);
    outline: none;
  `, [
    cB('tree', 'max-height: var(--menu-height);'),
    cE('empty', `
      display: flex;
      padding: 12px 32px;
      flex: 1;
      justify-content: center;
    `),
    cE('action', `
      padding: var(--action-padding);
      transition: 
        color .3s var(--bezier);
        border-color .3s var(--bezier);
      border-top: 1px solid var(--action-divider-color);
      color: var(--action-text-color);
    `),
    fadeInScaleUpTransition()
  ])
])

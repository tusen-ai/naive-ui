import { cB } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-border-radius
// --n-color
// --n-icon-color
export default cB('icon-wrapper', `
  transition:
    color .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
  background-color: var(--n-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--n-icon-color);
`)

import { cB } from '../../../_utils/cssr'

// vars:
// --n-text-color
// --n-bezier
export default cB('a', `
  cursor: pointer;
  transition:
    color var(--n-duration) var(--n-bezier),
    text-decoration-color var(--n-duration) var(--n-bezier);
  text-decoration-color: var(--n-text-color);
  color: var(--n-text-color);
`)

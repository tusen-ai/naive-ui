import { cB } from '../../../_utils/cssr'

// vars:
// --n-text-color
// --n-bezier
export default cB('a', `
  cursor: pointer;
  transition:
    color .3s var(--n-bezier),
    text-decoration-color .3s var(--n-bezier);
  text-decoration-color: var(--n-text-color);
  color: var(--n-text-color);
`)

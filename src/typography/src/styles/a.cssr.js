import { cB } from '../../../_utils/cssr'

// vars:
// --text-color
// --bezier
export default cB('a', `
  cursor: pointer;
  transition:
    color .3s var(--bezier),
    text-decoration-color .3s var(--bezier);
  text-decoration-color: var(--text-color);
  color: var(--text-color);
`)

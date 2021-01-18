import { cB } from '../../../_utils/cssr'

// vars:
// --color
export default cB('hr', `
  margin: 12px 0;
  transition: border-color .3s var(--bezier);
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-top: 1px solid var(--color);
`)

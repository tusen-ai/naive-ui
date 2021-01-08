import { cB } from '../../../_utils/cssr'

// vars:
// --color
export default cB('hr', `
  margin: 12px 0;
  transition: border-color .3s var(--bezier);
  borderLeft: none;
  borderRight: none;
  borderBottom: none;
  borderTop: 1px solid var(--color);
`)

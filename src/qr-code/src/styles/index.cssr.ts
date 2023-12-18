import { c, cB } from '../../../_utils/cssr'

// vars:
// --n-border-radius
export default c([
  cB('qr-code', `
    background: #fff;
    border-radius: var(--n-border-radius);
    display: inline-flex;
  `)
])

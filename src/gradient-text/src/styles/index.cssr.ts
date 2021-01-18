import { cB } from '../../../_utils/cssr'

// vars:
// --font-weight
// --rotate
// --bezier
// --color-start
// --color-end
export default cB('gradient-text', `
  display: inline-block;
  font-weight: var(--font-weight);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
  background-image: linear-gradient(var(--rotate), var(--color-start) 0%, var(--color-end) 100%);
  transition:
    --color-start .3s var(--bezier),
    --color-end .3s var(--bezier);
`)

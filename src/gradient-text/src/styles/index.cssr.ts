import { cB } from '../../../_utils/cssr'

// vars:
// --n-font-weight
// --n-rotate
// --n-bezier
// --n-color-start
// --n-color-end
export default cB('gradient-text', `
  display: inline-block;
  font-weight: var(--n-font-weight);
  -webkit-background-clip: text;
  background-clip: text;
  color: #0000;
  white-space: nowrap;
  background-image: linear-gradient(var(--n-rotate), var(--n-color-start) 0%, var(--n-color-end) 100%);
  transition:
    --n-color-start .3s var(--n-bezier),
    --n-color-end .3s var(--n-bezier);
`)

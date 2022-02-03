import { cB } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-border-radius
// --n-color
export default cB('icon-wrapper', `
  transition: background-color .3s var(--n-bezier);
  background-color: var(--n-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`, [
  cB('icon', 'color: #fff;')
])

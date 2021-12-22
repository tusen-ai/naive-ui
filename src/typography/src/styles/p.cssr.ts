import { c, cB } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-font-size
// --n-line-height
// --n-margin
// --n-text-color
export default cB('p', `
  box-sizing: border-box;
  transition: color .3s var(--n-bezier);
  margin: var(--n-margin);
  font-size:  var(--n-font-size);
  line-height: var(--n-line-height);
  color: var(--n-text-color);
`, [
  c('&:first-child', 'margin-top: 0;'),
  c('&:last-child', 'margin-bottom: 0;')
])

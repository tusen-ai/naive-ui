import { c, cB } from '../../../_utils/cssr'

// vars:
// --bezier
// --font-size
// --line-height
// --margin
// --text-color
export default cB('p', `
  box-sizing: border-box;
  transition: color .3s var(--bezier);
  margin: var(--margin);
  font-size:  var(--font-size);
  line-height: var(--line-height);
  color: var(--text-color);
`, [
  c('&:first-child', 'margin-top: 0;'),
  c('&:last-child', 'margin-bottom: 0;')
])

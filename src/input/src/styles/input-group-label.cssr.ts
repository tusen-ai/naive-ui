import { cB, cE } from '../../../_utils/cssr'

// vars:
// --bezier
// --group-label-color
// --border-radius
// --group-label-text-color
// --font-size
// --height
// --group-label-border
export default cB('input-group-label', `
  position: relative;
  user-select: none;
  box-sizing: border-box;
  padding: 0 12px;
  display: inline-block;
  border-radius: var(--border-radius);
  background-color: var(--group-label-color);
  color: var(--group-label-text-color);
  font-size: var(--font-size);
  line-height: var(--height);
  height: var(--height);
  transition: 
    color .3s var(--bezier),
    background-color .3s var(--bezier),
    box-shadow .3s var(--bezier);
`, [
  cE('border', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    border: var(--group-label-border);
    transition: border-color .3s var(--bezier);
  `)
])

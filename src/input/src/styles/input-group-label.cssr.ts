import { cB, cE } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-duration
// --n-group-label-color
// --n-border-radius
// --n-group-label-text-color
// --n-font-size
// --n-height
// --n-group-label-border
export default cB('input-group-label', `
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
  padding: 0 12px;
  display: inline-block;
  border-radius: var(--n-border-radius);
  background-color: var(--n-group-label-color);
  color: var(--n-group-label-text-color);
  font-size: var(--n-font-size);
  line-height: var(--n-height);
  height: var(--n-height);
  flex-shrink: 0;
  white-space: nowrap;
  transition: 
    color var(--n-duration) var(--n-bezier),
    background-color var(--n-duration) var(--n-bezier),
    box-shadow var(--n-duration) var(--n-bezier);
`, [
  cE('border', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    border: var(--n-group-label-border);
    transition: border-color var(--n-duration) var(--n-bezier);
  `)
])

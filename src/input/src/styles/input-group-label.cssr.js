import { cB, cE } from '../../../_utils/cssr'

// vars:
// --ip-bezier
// --ip-group-label-color
// --ip-border-radius
// --ip-text-color
// --ip-font-size
// --ip-height
export default cB('input-group-label', `
  position: relative;
  user-select: none;
  box-sizing: border-box;
  padding: 0 12px;
  display: inline-block;
  border-radius: var(--ip-border-radius);
  background-color: var(--ip-group-label-color);
  color: var(--ip-text-color);
  font-size: var(--ip-font-size);
  line-height: var(--ip-height);
  height: var(--ip-height);
  transition: 
    color .3s var(--ip-bezier),
    background-color .3s var(--ip-bezier),
    box-shadow .3s var(--ip-bezier);
`, [
  cE('border', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    border: var(--ip-border);
    transition: 'border-color .3s var(--ip-bezier);
  `)
])

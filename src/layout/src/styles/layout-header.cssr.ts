import { cB, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-duration
// --n-text-color
// --n-color
// --n-border-color
export default cB('layout-header', `
  transition:
    color var(--n-duration) var(--n-bezier),
    background-color var(--n-duration) var(--n-bezier),
    box-shadow var(--n-duration) var(--n-bezier),
    border-color var(--n-duration) var(--n-bezier);
  box-sizing: border-box;
  width: 100%;
  background-color: var(--n-color);
  color: var(--n-text-color);
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  `),
  cM('bordered', `
    border-bottom: solid 1px var(--n-border-color);
  `)
])

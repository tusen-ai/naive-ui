import { cB, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-duration
// --n-color
// --n-border-color
// --n-text-color
export default cB('layout-footer', `
  transition:
    box-shadow var(--n-duration) var(--n-bezier),
    color var(--n-duration) var(--n-bezier),
    background-color var(--n-duration) var(--n-bezier),
    border-color var(--n-duration) var(--n-bezier);
  color: var(--n-text-color);
  background-color: var(--n-color);
  box-sizing: border-box;
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  `),
  cM('bordered', `
    border-top: solid 1px var(--n-border-color);
  `)
])

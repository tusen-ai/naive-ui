import { cB, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-color
// --n-text-color
export default cB('layout', `
  color: var(--n-text-color);
  background-color: var(--n-color);
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  flex: auto;
  overflow: hidden;
  transition:
    box-shadow .3s var(--n-bezier),
    background-color .3s var(--n-bezier),
    color .3s var(--n-bezier);
`, [
  cB('layout-scroll-container', `
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;
  `),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `)
])

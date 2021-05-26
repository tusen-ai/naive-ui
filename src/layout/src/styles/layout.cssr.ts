import { cB, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --color
// --text-color
export default cB('layout', `
  color: var(--text-color);
  background-color: var(--color);
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  flex: auto;
  transition:
    box-shadow .3s var(--bezier),
    background-color .3s var(--bezier),
    color .3s var(--bezier);
`, [
  cB('layout-scroll-container', `
    box-sizing: border-box;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  `),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `)
])

import { cB, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --color
// --border-color
export default cB('layout-footer', `
  transition:
    background-color .3s var(--bezier),
    border-color .3s var(--bezier);
  background-color: var(--color);
  box-sizing: border-box;
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  `),
  cM('bordered', `
    border-top: solid 1px var(--border-color);
  `)
])

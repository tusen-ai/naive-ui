import { cB, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --text-color
// --color
// --border-color
export default cB('layout-header', `
  transition:
    color .3s var(--bezier),
    background-color .3s var(--bezier),
    box-shadow .3s var(--bezier),
    border-color .3s var(--bezier);
  box-sizing: border-box;
  width: 100%;
  background-color: var(--color);
  color: var(--text-color);
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  `),
  cM('bordered', `
    border-bottom: solid 1px var(--border-color);
  `)
])

import { cB, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --header-color
// --header-border-color
export default cB('layout-header', `
  transition:
    background-color .3s var(--bezier),
    box-shadow .3s var(--bezier),
    border-color .3s var(--bezier);
  box-sizing: border-box;
  width: 100%;
  background-color: var(--header-color);
`, [
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  `),
  cM('bordered', `
    border-bottom: solid 1px var(--header-border-color);
  `)
])

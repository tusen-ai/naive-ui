import { cB, cM } from '../../../_utils/cssr'

// vars:
// --color
// --text-color
export default cB('layout', `
  color: var(--text-color);
  background-color: var(--color);
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  transition:
    margin-left .3s var(--bezier),
    background-color .3s var(--bezier),
    color .3s var(--bezier);
  flex: auto;
  overflow-x: hidden;
`, [
  cM('has-sider', `
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: row;
  `),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `)
])

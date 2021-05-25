import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --color
// --text-color
export default cB('layout', `
  color: var(--text-color);
  background-color: var(--color);
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  flex: auto;
  overflow-x: hidden;
  transition:
    box-shadow .3s var(--bezier),
    background-color .3s var(--bezier),
    color .3s var(--bezier);
`, [
  cM('has-sider', [
    c('>', [
      cE('content', `
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        flex-direction: row;
      `)
    ])
  ]),
  cE('content', 'box-sizing: border-box;'),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `)
])

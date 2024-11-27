import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-resize-trigger-color
// --n-resize-trigger-color-hover
// --n-bezier
export default cB('split', `
  display: flex;
  width: 100%;
  height: 100%;
`, [
  cM('horizontal', `
    flex-direction: row;
  `),
  cM('vertical', `
    flex-direction: column;
  `),
  cB('split-pane', `
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 0;
  `),
  cE('resize-trigger', `
    background-color: var(--n-resize-trigger-color);
    transition: background-color .3s var(--n-bezier);
  `, [
    cM('hover', `
      background-color: var(--n-resize-trigger-color-hover);
    `),
    c('&:hover', `
      background-color: var(--n-resize-trigger-color-hover);
    `)
  ])
])

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
  `, [
    cE('resize-trigger-wrapper', [
      c('&::after', `
        width: calc(100% + var(--n-resize-trigger-hit-size));
        height: 100%;
        `)
    ]),
  ]),
  cM('vertical', `
    flex-direction: column;
  `, [
    cE('resize-trigger-wrapper', [
      c('&::after', `
        width: 100%;
        height: calc(100% + var(--n-resize-trigger-hit-size));
        `)
    ]),
  ]),
  cB('split-pane-1', `
    overflow: hidden;
  `),
  cB('split-pane-2', `
    overflow: hidden;
    flex: 1;
  `),
  cE('resize-trigger-wrapper', `
    position: relative;
    `, [
    c('&::after', `
      content: '';
      position: absolute;
      inset: 50%;
      transform: translate(-50%, -50%);
      `)
  ]),
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

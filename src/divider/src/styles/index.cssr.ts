import { cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-color
// --n-text-color
// --n-font-size
// --n-font-weight
// --n-offset
// --n-border-width
export default cB('divider', `
  position: relative;
  display: grid;
  box-sizing: border-box;
  font-size: var(--n-font-size);
  color: var(--n-text-color);
  transition:
    color .3s var(--n-bezier);
`, [
  cNotM('vertical', [
    `
    width: 100%;
    align-items: center;
    margin: var(--n-margin);
    `,
    cM('title-position-before', `grid-template-columns: var(--n-offset) auto 1fr;`),
    cM('title-position-center', `grid-template-columns: 1fr auto 1fr;`),
    cM('title-position-after', `grid-template-columns: 1fr auto var(--n-offset);`),
    cE('title', `margin: 0 16px;`),
    cE('line', `
        width: 100%;
        border-color: var(--n-color);
        border-top-width: var(--n-border-width);
        border-top-style: solid;
      `),
    cM('dashed', [
      cE('line', `
          border-top-style: dashed;
        `)
    ]),
    cM('dotted', [
      cE('line', `
          border-top-style: dotted;
        `)
    ]),
  ]),
  cM('vertical', [
    `
    display: inline-grid;
    vertical-align: middle;
    min-height: 1em;
    height: 100%;
    justify-items: center;
    margin: var(--n-vertical-margin);
    `,
    cM('title-position-before', `grid-template-rows: var(--n-offset) auto 1fr;`),
    cM('title-position-center', `grid-template-rows: 1fr auto 1fr;`),
    cM('title-position-after', `grid-template-rows: 1fr auto var(--n-offset);`),
    cE('title', `margin: 16px 0;writing-mode: vertical-lr;`),
    cE('line', `
        height: 100%;
        border-color: var(--n-color);
        border-left-width: var(--n-border-width);
        border-left-style: solid;
      `),
    cM('dashed', [
      cE('line', `
            border-left-style: dashed;
          `)
    ]),
    cM('dotted', [
      cE('line', `
            border-left-style: dotted;
          `)
    ]),
  ]),
  cE('line', `
    transition:
      border-color .3s var(--n-bezier);
  `)
])

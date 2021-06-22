import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --dot-color
// --dot-color-active
// --dot-size
export default cB('carousel', `
  overflow: hidden;
  position: relative;
`, [
  cE('slides', `
    transition: transform .3s var(--bezier);
    display: flex;
  `, [
    c('> div', `
      overflow: hidden;
    `)
  ]),
  cE('dots', `
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 16px;
    display: flex;
    flex-wrap: nowrap;
  `),
  cE('dot', `
    margin-right: 12px;
    height: var(--dot-size);
    width: var(--dot-size);
    background-color: var(--dot-color);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color .3s var(--bezier);
  `, [
    cM('active', `
      background-color: var(--dot-color-active);
    `),
    c('&:last-child', `
      margin-right: 0;
    `)
  ])
])

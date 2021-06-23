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
    `, [
      c('> img', `
        display: block;
      `)
    ])
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
    transition:
      box-shadow .3s var(--bezier),
      background-color .3s var(--bezier);
    outline: none;
  `, [
    c('&:focus', `
      background-color: var(--dot-color-active);
    `),
    cM('active', `
      background-color: var(--dot-color-active);
    `),
    c('&:last-child', `
      margin-right: 0;
    `)
  ])
])

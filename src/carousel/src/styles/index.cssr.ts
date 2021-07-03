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
    cM('vertical', `
      flex-direction: column;
    `),
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
    display: flex;
    flex-wrap: nowrap;
  `, [
    cM('bottom', `
      transform: translateX(-50%);
      bottom: 16px;
      left: 50%;
    `),
    cM('top', `
      transform: translateX(-50%);
      top: 16px;
      left: 50%;
    `),
    cM('left', `
      transform: translateY(-50%);
      top: 50%;
      left: 16px;
      flex-direction: column;
    `),
    cM('right', `
      transform: translateY(-50%);
      top: 50%;
      right: 16px;
      flex-direction: column;
    `)]),
  cE('dot', `
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
    cM('vertical', `
      margin-bottom: 12px;
    `),
    cM('horizontal', `
      margin-right: 12px;
    `),
    c('&:last-child', `
      margin-right: 0;
    `)
  ])
])

import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-box-shadow
// --n-box-shadow-hover
// --n-box-shadow-pressed
// --n-color
// --n-text-color
// --n-color-hover
// --n-color-pressed
// --n-border-radius-square
export default cB('float-button', `
  user-select: none;
  cursor: pointer;
  color: var(--n-text-color);
  background-color: var(--n-color);
  font-size: 18px;
  transition:
    color .3s var(--n-bezier),
    border-color .3s var(--n-bezier),
    box-shadow .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
  box-shadow: var(--n-box-shadow);
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
`, [
  cM('circle-shape', `
    border-radius: 4096px;
  `),
  cM('square-shape', `
    border-radius: var(--n-border-radius-square);
  `),
  cE('fill', `
    position: absolute;
    inset: 0;
    transition: background-color .3s var(--n-bezier);
    border-radius: inherit;
  `),
  cE('body', `
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .3s var(--n-bezier), opacity .3s var(--n-bezier);
    border-radius: inherit;
    flex-direction: column;
    box-sizing: border-box;
    padding: 2px 4px;
    gap: 2px;
    transform: scale(1);
  `, [
    cE('description', `
      font-size: 12px;
      text-align: center;
      line-height: 14px;
    `)
  ]),
  c('&:hover', 'box-shadow: var(--n-box-shadow-hover);', [
    c('>', [
      cE('fill', `
        background-color: var(--n-color-hover);
      `)
    ])
  ]),
  c('&:active', 'box-shadow: var(--n-box-shadow-pressed);', [
    c('>', [
      cE('fill', `
        background-color: var(--n-color-pressed);
      `)
    ])
  ]),
  cM('show-menu', [
    c('>', [
      cE('menu', `
        pointer-events: all;
        bottom: 100%;
        opacity: 1;
      `),
      cE('close', `
        transform: scale(1);
        opacity: 1;
      `),
      cE('body', `
        transform: scale(0.75);
        opacity: 0;
      `)
    ])
  ]),
  cE('close', `
    opacity: 0;
    transform: scale(0.75);
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .3s var(--n-bezier), opacity .3s var(--n-bezier);
  `),
  cE('menu', `
    position: absolute;
    bottom: calc(100% - 8px);
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity .3s var(--n-bezier),
      bottom .3s var(--n-bezier); 
  `, [
    c('> *', `
      margin-bottom: 16px;
    `),
    cB('float-button', `
      position: relative !important;
    `)
  ])
])

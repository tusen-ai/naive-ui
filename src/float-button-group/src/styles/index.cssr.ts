import { c, cB, cE, cM } from '../../../_utils/cssr/index'

// --n-border-radius-square
export default cB('float-button-group', [
  cB('float-button', `
    position: relative;
  `),
  cM('square-shape', `
    background-color: var(--n-color);
    cursor: pointer;
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    border-radius: var(--n-border-radius-square);
    flex-direction: column;
    box-shadow: var(--n-box-shadow);
    transition:
      color .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
  `, [
    cB('float-button', `
      background-color: unset;
      border-radius: 0;
      box-shadow: none;
      box-sizing: content-box;
    `, [
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--n-button-border-color);    
      `),
      c('&:first-child', `
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      `),
      c('&:last-child', `
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      `),
      cE('fill', 'inset: 4px; border-radius: var(--n-border-radius-square);')
    ])
  ]),
  cM('circle-shape', [
    c('>:not(:last-child)', `
      margin-bottom: 16px;
    `)
  ])
])

import { cB, c, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-bezier
// --n-text-color
// --n-color
// --n-color-hover
// --n-border-radius
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-color-modal
// --n-color-popover
// --n-color-hover-modal
// --n-color-hover-popover
export default c([
  cB('list', `
    --n-merged-border-color: var(--n-border-color);
    --n-merged-color: var(--n-color);
    --n-merged-color-hover: var(--n-color-hover);
    margin: 0;
    font-size: var(--n-font-size);
    transition:
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
    padding: 0;
    list-style-type: none;
    color: var(--n-text-color);
    background-color: var(--n-merged-color);
  `, [
    cM('show-divider', [
      cB('list-item', [
        c('&:not(:last-child)', [
          cE('divider', `
            background-color: var(--n-merged-border-color);
          `)
        ])
      ])
    ]),
    cM('clickable', [
      cB('list-item', `
        cursor: pointer;
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--n-merged-border-color);
      border-radius: var(--n-border-radius);
    `),
    cM('hoverable', [
      cB('list-item', `
        border-radius: var(--n-border-radius);
      `, [
        c('&:hover', `
          background-color: var(--n-merged-color-hover);
        `, [
          cE('divider', `
            background-color: transparent;
          `)
        ])
      ])
    ]),
    cM('bordered, hoverable', [
      cB('list-item', `
        padding: 12px 20px;
      `),
      cE('header, footer', `
        padding: 12px 20px;
      `)
    ]),
    cE('header, footer', `
      padding: 12px 0;
      box-sizing: border-box;
      transition: border-color .3s var(--n-bezier);
    `, [
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--n-merged-border-color);
      `)
    ]),
    cB('list-item', `
      position: relative;
      padding: 12px 0;    
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition:
        background-color .3s var(--n-bezier),
        border-color .3s var(--n-bezier);
    `, [
      cE('prefix', `
        margin-right: 20px;
        flex: 0;
      `),
      cE('suffix', `
        margin-left: 20px;
        flex: 0;
      `),
      cE('main', `
        flex: 1;
      `),
      cE('divider', `
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: transparent;
        transition: background-color .3s var(--n-bezier);
        pointer-events: none;
      `)
    ])
  ]),
  insideModal(
    cB('list', `
      --n-merged-color-hover: var(--n-color-hover-modal);
      --n-merged-color: var(--n-color-modal);
      --n-merged-border-color: var(--n-border-color-modal);
    `)
  ),
  insidePopover(
    cB('list', `
      --n-merged-color-hover: var(--n-color-hover-popover);
      --n-merged-color: var(--n-color-popover);
      --n-merged-border-color: var(--n-border-color-popover);
    `)
  )
])

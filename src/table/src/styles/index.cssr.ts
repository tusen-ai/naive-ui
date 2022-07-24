import { c, cB, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-td-color
// --n-td-color-modal
// --n-td-color-popover
// --n-td-text-color
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-border-radius
// --n-font-size
// --n-th-color
// --n-th-color-modal
// --n-th-color-popover
// --n-th-font-weight
// --n-th-text-color
// --n-line-height
// --n-td-padding
// --n-th-padding
export default c([
  cB('table', `
    font-size: var(--n-font-size);
    font-variant-numeric: tabular-nums;
    line-height: var(--n-line-height);
    width: 100%;
    border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    background-color: var(--n-td-color);
    border-color: var(--n-merged-border-color);
    transition:
      background-color .3s var(--n-bezier),
      border-color .3s var(--n-bezier),
      color .3s var(--n-bezier);
    --n-merged-border-color: var(--n-border-color);
  `, [
    c('th', `
      white-space: nowrap;
      transition:
        background-color .3s var(--n-bezier),
        border-color .3s var(--n-bezier),
        color .3s var(--n-bezier);
      text-align: inherit;
      padding: var(--n-th-padding);
      vertical-align: inherit;
      text-transform: none;
      border: 0px solid var(--n-merged-border-color);
      font-weight: var(--n-th-font-weight);
      color: var(--n-th-text-color);
      background-color: var(--n-th-color);
      border-bottom: 1px solid var(--n-merged-border-color);
      border-right: 1px solid var(--n-merged-border-color);
    `, [
      c('&:last-child', `
        border-right: 0px solid var(--n-merged-border-color);
      `)
    ]),
    c('td', `
      transition:
        background-color .3s var(--n-bezier),
        border-color .3s var(--n-bezier),
        color .3s var(--n-bezier);
      padding: var(--n-td-padding);
      color: var(--n-td-text-color);
      background-color: var(--n-td-color);
      border: 0px solid var(--n-merged-border-color);
      border-right: 1px solid var(--n-merged-border-color);
      border-bottom: 1px solid var(--n-merged-border-color);
    `, [
      c('&:last-child', `
        border-right: 0px solid var(--n-merged-border-color);
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--n-merged-border-color);
      border-radius: var(--n-border-radius);
    `, [
      c('tr', [
        c('&:last-child', [
          c('td', `
            border-bottom: 0 solid var(--n-merged-border-color);
          `)
        ])
      ])
    ]),
    cM('single-line', [
      c('th', `
        border-right: 0px solid var(--n-merged-border-color);
      `),
      c('td', `
        border-right: 0px solid var(--n-merged-border-color);
      `)
    ]),
    cM('single-column', [
      c('tr', [
        c('&:not(:last-child)', [
          c('td', `
            border-bottom: 0px solid var(--n-merged-border-color);
          `)
        ])
      ])
    ]),
    cM('striped', [
      c('tr:nth-of-type(even)', [c('td', 'background-color: var(--n-td-color-striped)')])
    ]),
    cNotM('bottom-bordered', [
      c('tr', [
        c('&:last-child', [
          c('td', `
            border-bottom: 0px solid var(--n-merged-border-color);
          `)
        ])
      ])
    ])
  ]),
  insideModal(
    cB('table', `
      background-color: var(--n-td-color-modal);
      --n-merged-border-color: var(--n-border-color-modal);
    `, [
      c('th', `
        background-color: var(--n-th-color-modal);
      `),
      c('td', `
        background-color: var(--n-td-color-modal);
      `)
    ])
  ),
  insidePopover(
    cB('table', `
      background-color: var(--n-td-color-popover);
      --n-merged-border-color: var(--n-border-color-popover);
    `, [
      c('th', `
        background-color: var(--n-th-color-popover);
      `),
      c('td', `
        background-color: var(--n-td-color-popover);
      `)
    ])
  )
])

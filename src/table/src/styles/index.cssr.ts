import { c, cB, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --bezier
// --td-color
// --td-color-modal
// --td-color-popover
// --td-text-color
// --border-color
// --border-color-modal
// --border-color-popover
// --border-radius
// --font-size
// --th-color
// --th-color-modal
// --th-color-popover
// --th-font-weight
// --th-text-color
// --line-height
// --td-padding
// --th-padding
export default c([
  cB('table', `
    font-size: var(--font-size);
    font-variant-numeric: tabular-nums;
    line-height: var(--line-height);
    width: 100%;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    background-color: var(--td-color);
    transition:
      background-color .3s var(--bezier),
      border-color .3s var(--bezier),
      color .3s var(--bezier);
    --merged-border-color: var(--border-color);
  `, [
    c('th', `
      white-spac: nowrap;
      transition:
        background-color .3s var(--bezier),
        border-color .3s var(--bezier),
        color .3s var(--bezier);
      text-align: inherit;
      padding: var(--th-padding);
      vertical-align: inherit;
      text-transform: none;
      border: none;
      font-weight: var(--th-font-weight);
      color: var(--th-text-color);
      background-color: var(--th-color);
      border-color: var(--merged-border-color);
      border-bottom: 1px solid var(--merged-border-color);
      border-right: 1px solid var(--merged-border-color);
    `, [
      c('&:last-child', `
        border-right: none;
      `)
    ]),
    c('td', `
      transition:
        background-color .3s var(--bezier),
        border-color .3s var(--bezier),
        color .3s var(--bezier);
      padding: var(--td-padding);
      color: var(--td-text-color);
      background-color: var(--td-color);
      border-right: 1px solid var(--merged-border-color);
      border-bottom: 1px solid var(--merged-border-color);
    `, [
      c('&:last-child', `
        border-right: none;
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--merged-border-color);
      border-radius: var(--border-radius);
    `, [
      c('tr', [
        c('&:last-child', [
          c('td', `
            border-bottom: none;
          `)
        ])
      ])
    ]),
    cM('single-line', [
      c('th', `
        border-right: none;
      `),
      c('td', `
        border-right: none;
      `)
    ]),
    cM('single-column', [
      c('tr', [
        c('&:not(:last-child)', [
          c('td', `
            border-bottom: none;
          `)
        ])
      ])
    ]),
    cNotM('bottom-bordered', [
      c('tr', [
        c('&:last-child', [
          c('td', `
            border-bottom: none;
          `)
        ])
      ])
    ])
  ]),
  insideModal(
    cB('table', `
      background-color: var(--td-color-modal);
      --merged-border-color: var(--border-color-modal);
    `, [
      c('th', `
        background-color: var(--th-color-modal);
      `),
      c('td', `
        background-color: var(--td-color-modal);
      `)
    ])
  ),
  insidePopover(
    cB('table', `
      background-color: var(--td-color-popover);
      --merged-border-color: var(--border-color-popover);
    `, [
      c('th', `
        background-color: var(--th-color-popover);
      `),
      c('td', `
        background-color: var(--td-color-popover);
      `)
    ])
  )
])

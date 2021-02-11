import { c, cB, cE, cM, cNotM, insideModal } from '../../../_utils/cssr'

// vars:
// --bezier
// --td-color
// --td-color-modal
// --td-text-color
// --border-color
// --border-radius
// --font-size
// --th-color
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
  `, [
    cE('th', `
      background-clip: padding-box;
      white-space: nowrap;
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
      border-color: var(--border-color);
      border-bottom: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
    `, [
      c('&:last-child', `
        border-right: none;
      `)
    ]),
    cE('td', `
      transition:
        background-color .3s var(--bezier),
        border-color .3s var(--bezier),
        color .3s var(--bezier);
      padding: var(--td-padding);
      color: var(--td-text-color);
      background-color: var(--td-color);
      border-right: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    `, [
      c('&:last-child', `
        border-right: none;
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
    `, [
      cE('tr', [
        c('&:last-child', [
          cE('td', `
            border-bottom: none;
          `)
        ])
      ])
    ]),
    cM('single-line', [
      cE('th', `
        border-right: none;
      `),
      cE('td', `
        border-right: none;
      `)
    ]),
    cM('single-column', [
      cE('tr', [
        c('&:not(:last-child)', [
          cE('td', `
            border-bottom: none;
          `)
        ])
      ])
    ]),
    cNotM('bottom-bordered', [
      cE('tr', [
        c('&:last-child', [
          cE('td', `
            border-bottom: none;
          `)
        ])
      ])
    ])
  ]),
  insideModal(
    cB('table', `
      background-color: var(--td-color-modal);
    `, [
      cE('td', `
        background-color: var(--td-color-modal);
      `)
    ])
  )
])

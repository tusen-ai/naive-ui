import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --font-size
// --bezier
// --item-text-color
// --item-text-color-hover
// --item-text-color-pressed
// --item-text-color-active
// --separator-color
// --font-weight-active
export default cB('breadcrumb', `
  white-space: nowrap;
`, [
  cB('breadcrumb-item', {
    fontSize: 'var(--font-size)',
    transition: 'color .3s var(--bezier)'
  }, [
    cB('icon', `
      font-size: 18px;
      vertical-align: -.2em;
      transition: color .3s var(--bezier);
      color: var(--item-text-color);
    `),
    cE('link', {
      cursor: 'pointer',
      transition: 'color .3s var(--bezier)',
      color: 'var(--item-text-color)'
    }),
    cE('separator', {
      margin: '0 8px',
      color: 'var(--separator-color)',
      transition: 'color .3s var(--bezier)'
    }),
    c('&:hover', [
      cB('icon', {
        color: 'var(--item-text-color-hover)'
      }),
      cE('link', {
        color: 'var(--item-text-color-hover)'
      })
    ]),
    c('&:active', [
      cB('icon', {
        color: 'var(--item-text-color-pressed)'
      }),
      cE('link', {
        color: 'var(--item-text-color-pressed)'
      })
    ]),
    c('&:last-child', [
      cE('link', `
        font-weight: var(--font-weight-active);
        cursor: unset;
        color: var(--item-text-color-active);
      `),
      cB('icon', {
        color: 'var(--item-text-color-active)'
      }),
      cE('separator', {
        display: 'none'
      })
    ])
  ])
])

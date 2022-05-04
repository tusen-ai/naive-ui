import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-bezier
// --n-item-text-color
// --n-item-text-color-hover
// --n-item-text-color-pressed
// --n-item-text-color-active
// --n-separator-color
// --n-font-weight-active
export default cB('breadcrumb', `
  white-space: nowrap;
`, [
  c('ul', `
    list-style: none;
    padding: 0;
    margin: 0;
  `),
  c('a', `
    color: inherit;
    text-decoration: inherit;
  `),
  cB('breadcrumb-item', {
    fontSize: 'var(--n-font-size)',
    transition: 'color .3s var(--n-bezier)',
    display: 'inline-block'
  }, [
    cB('icon', `
      font-size: 18px;
      vertical-align: -.2em;
      transition: color .3s var(--n-bezier);
      color: var(--n-item-text-color);
    `),
    cE('link', {
      cursor: 'pointer',
      transition: 'color .3s var(--n-bezier)',
      color: 'var(--n-item-text-color)'
    }),
    cE('separator', {
      margin: '0 8px',
      color: 'var(--n-separator-color)',
      transition: 'color .3s var(--n-bezier)'
    }),
    c('&:hover', [
      cB('icon', {
        color: 'var(--n-item-text-color-hover)'
      }),
      cE('link', {
        color: 'var(--n-item-text-color-hover)'
      })
    ]),
    c('&:active', [
      cB('icon', {
        color: 'var(--n-item-text-color-pressed)'
      }),
      cE('link', {
        color: 'var(--n-item-text-color-pressed)'
      })
    ]),
    c('&:last-child', [
      cE('link', `
        font-weight: var(--n-font-weight-active);
        cursor: unset;
        color: var(--n-item-text-color-active);
      `),
      cB('icon', {
        color: 'var(--n-item-text-color-active)'
      }),
      cE('separator', {
        display: 'none'
      })
    ])
  ])
])

import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-bezier
// --n-item-text-color
// --n-item-text-color-hover
// --n-item-text-color-pressed
// --n-item-text-color-active
// --n-separator-color
// --n-font-weight-active
// --n-item-border-radius
// --n-item-color-hover
// --n-item-color-active
// --n-item-line-height
export default cB('breadcrumb', `
  white-space: nowrap;
  cursor: default;
  line-height: var(--n-item-line-height);
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
  cB('breadcrumb-item', `
    font-size: var(--n-font-size);
    transition: color .3s var(--n-bezier);
    display: inline-flex;
    align-items: center;
  `, [
    cB('icon', `
      font-size: 18px;
      vertical-align: -.2em;
      transition: color .3s var(--n-bezier);
      color: var(--n-item-text-color);
    `),
    c('&:not(:last-child)', [
      cM('clickable', [
        cE('link', `
          cursor: pointer;
        `, [
          c('&:hover', `
            background-color: var(--n-item-color-hover);
          `),
          c('&:active', `
            background-color: var(--n-item-color-pressed);  
          `)
        ])
      ])
    ]),
    cE('link', `
      padding: 4px;
      border-radius: var(--n-item-border-radius);
      transition:
        background-color .3s var(--n-bezier),
        color .3s var(--n-bezier);
      color: var(--n-item-text-color);
      position: relative;
    `, [
      c('&:hover', `
        color: var(--n-item-text-color-hover);
      `, [
        cB('icon', `
          color: var(--n-item-text-color-hover);
        `)
      ]),
      c('&:active', `
        color: var(--n-item-text-color-pressed);
      `, [
        cB('icon', `
          color: var(--n-item-text-color-pressed);
        `)
      ])
    ]),
    cE('separator', `
      margin: 0 8px;
      color: var(--n-separator-color);
      transition: color .3s var(--n-bezier);
      user-select: none;
      -webkit-user-select: none;
    `),
    c('&:last-child', [
      cE('link', `
        font-weight: var(--n-font-weight-active);
        cursor: unset;
        color: var(--n-item-text-color-active);
      `, [
        cB('icon', `
          color: var(--n-item-text-color-active);
        `)
      ]),
      cE('separator', `
        display: none;
      `)
    ])
  ])
])

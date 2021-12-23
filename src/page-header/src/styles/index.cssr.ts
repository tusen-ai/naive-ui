import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-title-font-size
// --n-title-text-color
// --n-font-size
// --n-subtitle-text-color
// --n-back-color
// --n-back-color-hover
// --n-back-color-pressed
// --n-back-size
// --n-title-font-weight
// --n-bezier
export default c([
  cB('page-header-header', `
    margin-bottom: 20px;
  `),
  cB('page-header', `
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5;
    font-size: var(--n-font-size);
  `, [
    cE('main', `
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    `),
    cE('back', `
      display: flex;
      margin-right: 16px;
      font-size: var(--n-back-size);
      cursor: pointer;
      color: var(--n-back-color);
      transition: color .3s var(--n-bezier);
    `, [
      c('&:hover', 'color: var(--n-back-color-hover);'),
      c('&:active', 'color: var(--n-back-color-pressed);')
    ]),
    cE('avatar', `
      display: flex;
      margin-right: 12px
    `),
    cE('title', `
      margin-right: 16px;
      transition: color .3s var(--n-bezier);
      font-size: var(--n-title-font-size);
      font-weight: var(--n-title-font-weight);
      color: var(--n-title-text-color);
    `),
    cE('subtitle', `
      font-size: 14px;
      transition: color .3s var(--n-bezier);
      color: var(--n-subtitle-text-color);
    `)
  ]),
  cB('page-header-content', `
    font-size: var(--n-font-size);
  `, [
    c('&:not(:first-child)', 'margin-top: 20px;')
  ]),
  cB('page-header-footer', `
    font-size: var(--n-font-size);
  `, [
    c('&:not(:first-child)', 'margin-top: 20px;')
  ])
])

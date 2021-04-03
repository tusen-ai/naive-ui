import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --title-font-size
// --title-text-color
// --font-size
// --subtitle-text-color
// --back-color
// --back-color-hover
// --back-color-pressed
// --back-size
// --title-font-weight
// --bezier
export default c([
  cB('page-header-header', `
    margin-bottom: 20px;
  `),
  cB('page-header', `
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1.5;
    font-size: var(--font-size);
  `, [
    cE('main', `
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    `),
    cE('back', `
      display: flex;
      margin-right: 16px;
      font-size: var(--back-size);
      cursor: pointer;
      color: var(--back-color);
      transition: color .3s var(--bezier);
    `, [
      c('&:hover', 'color: var(--back-color-hover);'),
      c('&:active', 'color: var(--back-color-pressed);')
    ]),
    cE('avatar', `
      display: flex;
      margin-right: 12px
    `),
    cE('title', `
      margin-right: 16px;
      transition: color .3s var(--bezier);
      font-size: var(--title-font-size);
      font-weight: var(--title-font-weight);
      color: var(--title-text-color);
    `),
    cE('subtitle', `
      font-size: 14px;
      transition: color .3s var(--bezier);
      color: var(--subtitle-text-color);
    `)
  ]),
  cB('page-header-content', `
    margin-top: 20px;
    font-size: var(--font-size);
  `),
  cB('page-header-footer', `
    margin-top: 20px;
    font-size: var(--font-size);
  `)
])

import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --bezier
// --font-size
// --text-color
// --title-font-weight
// --title-text-color
export default cB('thing', `
  display: flex;
  transition: color .3s var(--bezier);
  font-size: var(--font-size);
  color: var(--text-color);
`, [
  cB('thing-avatar', `
    margin-right: 12px;
    margin-top: 2px;
  `),
  cB('thing-avatar-header-wrapper', `
    display: flex;
    flex-wrap: nowrap;
  `, [
    cB('thing-header-wrapper', `
      flex: 1;
    `)
  ]),
  cB('thing-main', `
    flex-grow: 1;
  `, [
    cB('thing-header', `
      display: flex;
      margin-bottom: 4px;
      justify-content: space-between;
      align-items: center;
    `, [
      cE('title', `
        font-size: 16px;
        font-weight: var(--title-font-weight);
        transition: color .3s var(--bezier);
        color: var(--title-text-color);
      `)
    ]),
    cE('description', [
      c('&:not(:last-child)', `
        margin-bottom: 4px;
      `)
    ]),
    cE('content', [
      c('&:not(:first-child)', `
        margin-top: 12px;
      `)
    ]),
    cE('footer', [
      c('&:not(:first-child)', `
        margin-top: 12px;
      `)
    ]),
    cE('action', [
      c('&:not(:first-child)', `
        margin-top: 12px;
      `)
    ])
  ])
])

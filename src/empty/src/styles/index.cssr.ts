import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-icon-size
// --n-icon-color
// --n-bezier
// --n-text-color
// --n-extra-text-color
export default cB('empty', `
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--n-font-size);
`, [
  cE('icon', `
    width: var(--n-icon-size);
    height: var(--n-icon-size);
    font-size: var(--n-icon-size);
    line-height: var(--n-icon-size);
    color: var(--n-icon-color);
    transition:
      color .3s var(--n-bezier);
  `, [
    c('+', [
      cE('description', `
        margin-top: 8px;
      `)
    ])
  ]),
  cE('description', `
    transition: color .3s var(--n-bezier);
    color: var(--n-text-color);
  `),
  cE('extra', `
    text-align: center;
    transition: color .3s var(--n-bezier);
    margin-top: 12px;
    color: var(--n-extra-text-color);
  `)
])

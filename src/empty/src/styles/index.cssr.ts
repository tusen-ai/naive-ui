import { cB, cE } from '../../../_utils/cssr'

// vars:
// --font-size
// --icon-size
// --icon-color
// --bezier
// --text-color
// --extra-text-color
export default cB('empty', `
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--font-size);
`, [
  cE('icon', `
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
    line-height: var(--icon-size);
    color: var(--icon-color);
    transition:
      color .3s var(--bezier);
  `),
  cE('description', `
    margin-top: 4px;
    transition: color .3s var(--bezier);
    color: var(--text-color);
  `),
  cE('extra', `
    text-align: center;
    transition: color .3s var(--bezier);
    margin-top: 16px;
    color: var(--extra-text-color);
  `)
])

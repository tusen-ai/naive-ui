import { cB, cE } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-label-font-size
// --n-label-font-weight
// --n-label-text-color
// --n-value-font-weight
// --n-value-font-size
// --n-value-prefix-text-color
// --n-value-suffix-text-color
// --n-value-text-color
export default cB('statistic', [
  cE('label', `
    font-weight: var(--n-label-font-weight);
    transition: .3s color var(--n-bezier);
    font-size: var(--n-label-font-size);
    color: var(--n-label-text-color);
  `),
  cB('statistic-value', `
    margin-top: 4px;
    font-weight: var(--n-value-font-weight);
  `, [
    cE('prefix', `
      margin: 0 4px 0 0;
      font-size: var(--n-value-font-size);
      transition: .3s color var(--n-bezier);
      color: var(--n-value-prefix-text-color);
    `, [
      cB('icon', {
        verticalAlign: '-0.125em'
      })
    ]),
    cE('content', `
      font-size: var(--n-value-font-size);
      transition: .3s color var(--n-bezier);
      color: var(--n-value-text-color);
    `),
    cE('suffix', `
      margin: 0 0 0 4px;
      font-size: var(--n-value-font-size);
      transition: .3s color var(--n-bezier);
      color: var(--n-value-suffix-text-color);
    `, [
      cB('icon', {
        verticalAlign: '-0.125em'
      })
    ])
  ])
])

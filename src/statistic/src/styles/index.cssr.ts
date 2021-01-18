import { cB, cE } from '../../../_utils/cssr'

// vars:
// --bezier
// --label-font-size
// --label-font-weight
// --label-text-color
// --value-font-weight
// --value-prefix-text-color
// --value-suffix-text-color
// --value-text-color
export default cB('statistic', [
  cE('label', `
    font-weight: var(--label-font-weight);
    transition: .3s color var(--bezier);
    font-size: var(--label-font-size);
    color: var(--label-text-color);
  `),
  cB('statistic-value', `
    margin-top: 4px;
    font-weight: var(--value-font-weight);
  `, [
    cE('prefix', `
      margin: 0 4px;
      font-size: 18px;
      transition: .3s color var(--bezier);
      color: var(--value-prefix-text-color);
    `, [
      cB('icon', {
        verticalAlign: '-0.125em'
      })
    ]),
    cE('content', `
      font-size: 24px;
      transition: .3s color var(--bezier);
      color: var(--value-text-color);
    `),
    cE('suffix', `
      font-size: 18px;
      transition: .3s color var(--bezier);
      color: var(--value-suffix-text-color);
    `, [
      cB('icon', {
        verticalAlign: '-0.125em'
      })
    ])
  ])
])

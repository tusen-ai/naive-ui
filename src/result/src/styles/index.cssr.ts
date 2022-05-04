import { cB, cE } from '../../../_utils/cssr'

// --n-bezier
// --n-font-size
// --n-icon-size
// --n-line-height
// --n-text-color
// --n-title-font-size
// --n-title-font-weight
// --n-title-text-color
export default cB('result', `
  color: var(--n-text-color);
  line-height: var(--n-line-height);
  font-size: var(--n-font-size);
  transition:
    color .3s var(--n-bezier);
`, [
  cB('result-icon', `
    display: flex;
    justify-content: center;
    transition: color .3s var(--n-bezier);
  `, [
    cE('status-image', `
      font-size: var(--n-icon-size);
      width: 1em;
      height: 1em;
    `),
    cB('base-icon', `
      color: var(--n-icon-color);
      font-size: var(--n-icon-size);
    `)
  ]),
  cB('result-content', {
    marginTop: '24px'
  }),
  cB('result-footer', `
    margin-top: 24px;
    text-align: center;
  `),
  cB('result-header', [
    cE('title', `
      margin-top: 16px;
      font-weight: var(--n-title-font-weight);
      transition: color .3s var(--n-bezier);
      text-align: center;
      color: var(--n-title-text-color);
      font-size: var(--n-title-font-size);
    `),
    cE('description', `
      margin-top: 4px;
      text-align: center;
      font-size: var(--n-font-size);
    `)
  ])
])

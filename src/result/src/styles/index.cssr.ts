import { c, cB, cE } from '../../../_utils/cssr'

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
    height: 1em;
    display: flex;
    justify-content: center;
    transition: color .3s var(--n-bezier);
    color: var(--n-icon-color);
    font-size: var(--n-icon-size);
  `, [
    cE('status-image', {
      width: '1em'
    }),
    c('svg', {
      height: '1em'
    })
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

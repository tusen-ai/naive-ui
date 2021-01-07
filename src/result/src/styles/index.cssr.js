import { cB, cE } from '../../../_utils/cssr'

// --bezier
// --font-size
// --icon-size
// --line-height
// --text-color
// --title-font-size
// --title-font-weight
// --title-text-color
export default cB('result', `
  color: var(--text-color);
  line-height: var(--line-height);
  font-size: var(--font-size);
  transition:
    color .3s var(--bezier);
`, [
  cB('result-icon', `
    display: flex;
    justify-content: center;
    transition: color .3s var(--bezier);
    color: var(--icon-color);
  `, [
    cE('status-image', {
      width: 'var(--icon-size)'
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
      font-weight: var(--title-font-weight);
      transition: color .3s var(--bezier);
      text-align: center;
      color: var(--title-text-color);
      font-size: var(--title-font-size);
    `),
    cE('description', `
      margin-top: 4px;
      text-align: center;
      font-size: var(--font-size);
    `)
  ])
])

import { cB, cNotM, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-color
// --n-text-color
// --n-font-weight
export default cB('divider', `
  position: relative;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  color: var(--n-text-color);
  transition:
    color .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
`, [
  cNotM('vertical', `
    margin-top: 24px;
    margin-bottom: 24px;
  `, [
    cNotM('no-title', `
      display: flex;
      align-items: center;
    `)
  ]),
  cE('title', `
    display: flex;
    align-items: center;
    margin-left: 12px;
    margin-right: 12px;
    white-space: nowrap;
    font-weight: var(--n-font-weight);
  `),
  cM('title-position-left', [
    cE('line', [
      cM('left', {
        width: '28px'
      })
    ])
  ]),
  cM('title-position-right', [
    cE('line', [
      cM('right', {
        width: '28px'
      })
    ])
  ]),
  cM('dashed', [
    cE('line', `
      background-color: #0000;
      height: 0px;
      width: 100%;
      border-style: dashed;
      border-width: 1px 0 0;
    `)
  ]),
  cM('vertical', `
    display: inline-block;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;
    width: 1px;
  `),
  cE('line', `
    border: none;
    transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
    height: 1px;
    width: 100%;
    margin: 0;
  `),
  cNotM('dashed', [
    cE('line', {
      backgroundColor: 'var(--n-color)'
    })
  ]),
  cM('dashed', [
    cE('line', {
      borderColor: 'var(--n-color)'
    })
  ]),
  cM('vertical', {
    backgroundColor: 'var(--n-color)'
  })
])

import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  cB('color-picker-panel', `
    border-radius: 4px;
    padding: 12px;
  `, [
    cB('input', `
      text-align: center;
    `)
  ]),
  cB('color-picker-control', `
  `),
  cB('color-picker-handler', `
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
  `, [
    cM('alpha', `
      background-color: white;
    `)
  ]),
  cB('color-input', `
    display: flex;
    align-items: center;
  `, [
    cE('mode', `
      cursor: pointer;
      width: 72px;
      text-align: center;
    `),
    cE('unit', `
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    `)
  ])
])

import { cB, cE } from '../../../_utils/cssr'

// vars:
export default cB('heatmap', `
 display:flex;
 flex-direction:column;
 max-width:fit-content;
 gap:4px;
  `, [
  cE('container', `
display:flex;
 gap:4px;
    `),
  cE('week', `
    display: flex;
    flex-direction: column;
    gap:4px;
  `),
  cE('rect', `
    width:10px;
    height:10px;
    border-radius:3px;
    background-color: #eff2f5;
  `),
  cE('placeholder', `
    width:10px;
    height:10px;
  `),
  cE('footer', `
    `),
  cE('color-indicator', `
          float:inline-end;
    `),
])

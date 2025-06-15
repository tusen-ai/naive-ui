import { cB, cE } from '../../../_utils/cssr'

// vars:
export default cB('heatmap', `
 display:flex;
 flex-direction:column;
 max-width:fit-content;
 gap:8px;
  `, [
  cE('content', `
    display: block;
  `),
  cE('table', `
    border-collapse: separate;
    border-spacing: 2px;
    font-size: 12px;
  `),
  cE('week-header', `
    width: 29px;
    padding: 0;
    border: none;
  `),
  cE('month-label', `
    font-size: 12px;
    color: #656d76;
    text-align: left;
    height: 20px;
    line-height: 20px;
    font-weight: 400;
    padding: 0 2px;
    border: none;
    vertical-align: bottom;
  `),
  cE('day-row', `
    height: 12px;
  `),
  cE('week-label', `
    font-size: 12px;
    color: #656d76;
    text-align: right;
    width: 25px;
    height: 12px;
    line-height: 12px;
    padding: 0 4px 0 0;
    border: none;
    vertical-align: middle;
    white-space: nowrap;
    font-weight: 400;
  `),
  cE('cell', `
    width: 12px;
    height: 12px;
    padding: 0;
    border: none;
    vertical-align: middle;
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: 12px;
    color: #666;
    margin-top: 8px;
  `),
  cE('color-squares', `
    display: flex;
    gap: 2px;
  `),
  cE('color-square', `
    width: 10px;
    height: 10px;
    border-radius: 2px;
    border: 1px solid rgba(27,31,35,0.06);
  `),
  cE('color-indicator-text', `
    font-size: 12px;
    color: #656d76;
  `),
])

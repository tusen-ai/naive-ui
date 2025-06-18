import { cB, cE } from '../../../_utils/cssr'

// vars:
export default cB('heatmap', `
 display: flex;
 flex-direction: column;
 max-width: fit-content;
 gap: 8px;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  `, [
  cE('content', `
    display: block;
  `),
  cE('table', `
    border-collapse: separate;
    border-spacing: 3px;
    font-size: 12px;
  `),
  cE('week-header', `
    width: 27px;
    padding: 0;
    border: none;
    font-size: 12px;
  `),
  cE('month-label', `
    font-size: 12px;
    color: #656d76;
    text-align: left;
    height: 15px;
    line-height: 15px;
    font-weight: 400;
    padding: 0 2px 8px;
    border: none;
    vertical-align: bottom;
  `),
  cE('day-row', `
    height: 11px;
  `),
  cE('week-label', `
    font-size: 12px;
    color: #656d76;
    text-align: right;
    width: 27px;
    height: 11px;
    line-height: 11px;
    padding: 0 4px 0 0;
    border: none;
    vertical-align: middle;
    white-space: nowrap;
    font-weight: 400;
  `),
  cE('cell', `
    width: 11px;
    height: 11px;
    padding: 0;
    border: none;
    vertical-align: middle;
  `),
  cE('rect', `
    width: 11px;
    height: 11px;
    border-radius: 2px;
    background-color: #ebedf0;
    border: 1px solid rgba(27,31,35,0.06);
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    
    &:hover {
      border: 1px solid rgba(27,31,35,0.15);
    }
  `),
  cE('placeholder', `
    width: 11px;
    height: 11px;
  `),
  cE('footer', `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  `),
  cE('color-indicator', `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: 12px;
    color: #656d76;
  `),
  cE('color-squares', `
    display: flex;
    gap: 2px;
  `),
  cE('color-square', `
    width: 11px;
    height: 11px;
    border-radius: 2px;
    border: 1px solid rgba(27,31,35,0.06);
  `),
  cE('color-indicator-text', `
    font-size: 12px;
    color: #656d76;
  `),
])

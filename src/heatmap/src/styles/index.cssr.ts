import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-font-weight
// --n-text-color
// --n-border-radius
// --n-x-gap
// --n-y-gap
// --n-rect-color (for individual rect background color)

export default c([
  cB('heatmap', `
    display: flex;
    flex-direction: column;
    max-width: fit-content;
    font-size: var(--n-font-size);
  `, [
    cE('content', `
      display: block;
    `),
    cE('calendar-table', `
      border-collapse: separate;
      border-spacing: var(--n-y-gap) var(--n-x-gap);
      font-size: var(--n-font-size);
    `),
    cE('week-header-cell', `
      width: 27px;
      padding: 0;
      border: none;
      font-size: var(--n-font-size);
    `),
    cE('month-label-cell', `
      font-size: var(--n-font-size);
      color: var(--n-text-color);
      text-align: left;
      height: 15px;
      line-height: 15px;
      font-weight: var(--n-font-weight);
      padding: 0 2px 8px;
      vertical-align: bottom;
    `),
    cE('week-label-cell', `
      font-size: var(--n-font-size);
      color: var(--n-text-color);
      text-align: right;
      width: 27px;
      height: 11px;
      line-height: 11px;
      padding: 0 4px 0 0;
      border: none;
      vertical-align: middle;
      white-space: nowrap;
      font-weight: var(--n-font-weight);
    `),
    cE('day-cell', `
      width: 10px;
      height: 10px;
      padding: 0;
      border: none;
      vertical-align: middle;
    `),
    cE('empty-cell', `
      width: 11px;
      height: 11px;
    `),
    cE('footer', `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    `, [
      cE('info', `
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: calc(27px + 4px + var(--n-x-gap)); /* Align with the first data cell */
      `),
      cE('indicator', `
        display: flex;
        align-items: center;
        justify-content: flex-end;
      `)
    ])
  ]),
  cB('heatmap-rect', `
    width: 10px;
    height: 10px;
    border-radius: var(--n-border-radius);
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    background-color: var(--n-rect-color);
  `),
  cB('heatmap-color-indicator', `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: var(--n-font-size);
  `, [
    cE('cells', `
      display: flex;
      gap: 2px;
    `),
    cE('cell', `
      width: 10px;
      height: 10px;
      border-radius: var(--n-border-radius);
    `),
    cE('label', `
      font-size: var(--n-font-size);
      color: var(--n-text-color);
    `)
  ])
])

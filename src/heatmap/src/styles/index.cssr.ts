import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-font-weight
// --n-text-color
// --n-border-radius
// --n-x-gap
// --n-y-gap
// --n-rect-size
// --n-loading-color-start
// --n-loading-color-end
// --n-rect-color (for individual rect background color)
// --n-bezier

export default c([
  c('@keyframes heatmap-loading', `
    0% {
      background: var(--n-loading-color-start);
    }
    40% {
      background: var(--n-loading-color-end);
    }
    80% {
      background: var(--n-loading-color-start);
    }
    100% {
      background: var(--n-loading-color-start);
    }
  `),
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
      transition: color .3s var(--n-bezier);
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
      transition: color .3s var(--n-bezier);
    `),
    cE('day-cell', `
      width: var(--n-rect-size);
      height: var(--n-rect-size);
      padding: 0;
      border: none;
      vertical-align: middle;
      transition: color .3s var(--n-bezier);
    `),
    cE('empty-cell', `
      width: calc(var(--n-rect-size) + 1px);
      height: calc(var(--n-rect-size) + 1px);
    `),
    cE('loading-cell', `
      width: calc(var(--n-rect-size) + 1px);
      height: calc(var(--n-rect-size) + 1px);
      border-radius: var(--n-border-radius);
      animation: 2s heatmap-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
      background: var(--n-loading-color-start);
    `),
    cE('footer', `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      &:has(> :only-child) {
        justify-content: flex-end;
      }
    `),
    cE('footer__info', `
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 27px;
    `),
    cE('footer__indicator', `
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `)
  ]),
  cB('heatmap-rect', `
    width: var(--n-rect-size);
    height: var(--n-rect-size);
    border-radius: var(--n-border-radius);
    transition: all 0.1s ease-in-out;
    background-color: var(--n-rect-color);
  `, [
    cM('loading', `
      cursor: default;
      animation: 2s heatmap-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
      background: var(--n-loading-color-start) !important;
    `)
  ]),
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
      width: var(--n-rect-size);
      height: var(--n-rect-size);
      border-radius: var(--n-border-radius);
    `),
    cE('label', `
      font-size: var(--n-font-size);
      color: var(--n-text-color);
      transition: color .3s var(--n-bezier);
    `)
  ])
])

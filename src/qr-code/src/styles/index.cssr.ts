import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-border-radius
// --n-mask-color
// --n-status-text-color
// --n-refresh-text-color
export default c([
  cB('qr-code', `
    background: #fff;
    border-radius: var(--n-border-radius);
    display: inline-flex;
    position: relative;
    overflow: hidden;
  `, [
    cE('mask', `
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 1.6;
      background-color: var(--n-mask-color);
      color: var(--n-status-text-color);
    `),
    cE('status', `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    `),
    cE('refresh', `
      cursor: pointer;
      color: var(--n-refresh-text-color);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      font-size: inherit;
      line-height: inherit;
      padding: 0;
    `, [
      c('&:hover', `
        opacity: 0.8;
      `),
      c('&:focus', `
        outline: none;
      `),
      c('svg', `
        width: 1em;
        height: 1em;
      `)
    ])
  ])
])

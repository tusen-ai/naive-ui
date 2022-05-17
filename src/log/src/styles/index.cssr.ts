import { c, cB, cE } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-bezier
// --n-loading-color
// --n-loader-border
// --n-loader-color
// --n-loader-text-color
// --n-loader-font-size
// --n-loading-color
export default cB('log', `
  position: relative;
  box-sizing: border-box;
  transition: border-color .3s var(--n-bezier);
`, [
  c('pre', `
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
  `),
  cB('log-loader', `
    transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
    box-sizing: border-box;
    position: absolute;
    right: 16px;
    top: 8px;
    height: 34px;
    border-radius: 17px;
    line-height: 34px;
    white-space: nowrap;
    overflow: hidden;
    border: var(--n-loader-border);
    color: var(--n-loader-text-color);
    background-color: var(--n-loader-color);
    font-size: var(--n-loader-font-size);
  `, [
    fadeInScaleUpTransition(),
    cE('content', `
      display: inline-block;
      vertical-align: bottom;
      line-height: 34px;
      padding-left: 40px;
      padding-right: 20px;
      white-space: nowrap;
    `),
    cB('base-loading', `
      color: var(--n-loading-color);
      position: absolute;
      left: 12px;
      top: calc(50% - 10px);
      font-size: 20px;
      width: 20px;
      height: 20px;
      display: inline-block;
    `)
  ])
])

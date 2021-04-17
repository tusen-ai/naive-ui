import { c, cB, cE } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --bezier
// --loading-color
// --loader-border
// --loader-color
// --loader-text-color
// --loader-font-size
// --loading-color
export default cB('log', `
  position: relative;
  box-sizing: border-box;
  transition:
    border-color .3s var(--bezier),
    color .3s var(--bezier);
`, [
  cE('lines', `
    margin: 0;
    white-space: pre-wrap;
  `),
  c('pre', `
    margin: 0;
  `),
  cB('log-loader', `
    transition:
      color .3s var(--bezier),
      background-color .3s var(--bezier),
      border-color .3s var(--bezier);
    box-sizing: border-box;
    position: absolute;
    right: 16px;
    top: 8px;
    height: 34px;
    border-radius: 17px;
    line-height: 34px;
    white-space: nowrap;
    overflow: hidden;
    border: var(--loader-border);
    color: var(--loader-text-color);
    background-color: var(--loader-color);
    font-size: var(--loader-font-size);
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
      color: var(--loading-color);
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

import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --color
// --text-color
// --border-radius
// --panel-font-size
// --font-size
// --bezier
// --height
// --box-shadow
// --divider-color
export default c([
  cB('color-picker', `
    display: inline-block;
    box-sizing: border-box;
    height: var(--height);
    font-size: var(--font-size);
    width: 100%;
    position: relative;
  `),
  cB('color-picker-panel', `
    margin: 4px 0;
    width: 240px;
    font-size: var(--panel-font-size);
    color: var(--text-color);
    background-color: var(--color);
    transition:
      box-shadow .3s var(--bezier),
      color .3s var(--bezier),
      background-color .3s var(--bezier);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  `, [
    fadeInScaleUpTransition(),
    cB('input', `
      text-align: center;
    `)
  ]),
  cB('color-picker-checkboard', `
    background: white; 
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `, [
    c('&::after', `
      background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
      background-size: 12px 12px;
      background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
      background-repeat: repeat;
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    `)
  ]),
  cB('color-picker-slider', `
    margin-bottom: 8px;
    position: relative;
    box-sizing: border-box;
  `, [
    cE('image', `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    `),
    c('&::after', `
      content: "";
      position: absolute;
      border-radius: inherit;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
      pointer-events: none;
    `)
  ]),
  cB('color-picker-handle', `
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
    position: absolute;
    background-color: white;
    overflow: hidden;
  `, [
    cE('fill', `
      box-sizing: border-box;
      border: 2px solid white;
    `)
  ]),
  cB('color-picker-pallete', `
    height: 180px;
    position: relative;
    margin-bottom: 8px;
  `, [
    cE('layer', `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    `, [
      cM('shadowed', `
        box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
      `)
    ])
  ]),
  cB('color-picker-input', `
    display: flex;
    align-items: center;
  `, [
    cB('input', `
      flex-grow: 1;
      flex-basis: 0;
    `),
    cE('mode', `
      cursor: pointer;
      width: 72px;
      text-align: center;
    `)
  ]),
  cB('color-picker-control', `
    padding: 12px;
  `),
  cB('color-picker-action', `
    display: flex;
    margin-top: -4px;
    border-top: 1px solid var(--divider-color);
    padding: 8px 12px;
    justify-content: flex-end;
  `, [
    cB('button', 'margin-left: 8px;')
  ]),
  cB('color-picker-trigger', `
    border: var(--border);
    height: 100%;
    box-sizing: border-box;
    border-radius: var(--border-radius);
    transition: border-color .3s var(--bezier);
    cursor: pointer;
  `, [
    cE('value', `
      white-space: nowrap;
      position: relative;
    `),
    cE('fill', `
      border-radius: var(--border-radius);
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 4px;
      right: 4px;
      top: 4px;
      bottom: 4px;
    `),
    cB('color-picker-checkboard', `
      border-radius: var(--border-radius);
    `, [
      c('&::after', `
        --block-size: calc((var(--height) - 8px) / 3);
        background-size: calc(var(--block-size) * 2) calc(var(--block-size) * 2);
        background-position: 0 0, 0 var(--block-size), var(--block-size) calc(-1 * var(--block-size)), calc(-1 * var(--block-size)) 0px;  
      `)
    ])
  ])
])

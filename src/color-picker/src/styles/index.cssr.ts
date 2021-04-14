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
  cB('color-picker-slider', `
    margin-bottom: 8px;
    position: relative;
    box-sizing: border-box;
    box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
  `, [
    cE('grid', `
      height: 6px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, .12) 6px,transparent 6px);
      background-size: 12px 6px;
      background-repeat: repeat;
      position: relative;
    `, [
      cM('bottom', 'right: -6px;')
    ]),
    cE('image', `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
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
      transition: color .3s var(--bezier);
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
    `)
  ])
])

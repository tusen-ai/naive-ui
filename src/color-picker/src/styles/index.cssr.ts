import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-color
// --n-text-color
// --n-border-radius
// --n-panel-font-size
// --n-font-size
// --n-bezier
// --n-height
// --n-box-shadow
// --n-divider-color
export default c([
  cB('color-picker', `
    display: inline-block;
    box-sizing: border-box;
    height: var(--n-height);
    font-size: var(--n-font-size);
    width: 100%;
    position: relative;
  `),
  cB('color-picker-panel', `
    margin: 4px 0;
    width: 240px;
    font-size: var(--n-panel-font-size);
    color: var(--n-text-color);
    background-color: var(--n-color);
    transition:
      box-shadow .3s var(--n-bezier),
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
    border-radius: var(--n-border-radius);
    box-shadow: var(--n-box-shadow);
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
    z-index: 1;
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
    cursor: crosshair;
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
  cB('color-picker-preview', `
    display: flex;
  `, [
    cE('sliders', `
      flex: 1 0 auto;
    `),
    cE('preview', `
      position: relative;
      height: 30px;
      width: 30px;
      margin: 0 0 8px 6px;
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
      overflow: hidden;
    `),
    cE('fill', `
      display: block;
      width: 30px;
      height: 30px;
    `),
    cE('input', `
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      opacity: 0;
      z-index: 1;
    `)
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
    border-top: 1px solid var(--n-divider-color);
    padding: 8px 12px;
    justify-content: flex-end;
  `, [
    cB('button', 'margin-left: 8px;')
  ]),
  cB('color-picker-trigger', `
    border: var(--n-border);
    height: 100%;
    box-sizing: border-box;
    border-radius: var(--n-border-radius);
    transition: border-color .3s var(--n-bezier);
    cursor: pointer;
  `, [
    cE('value', `
      white-space: nowrap;
      position: relative;
    `),
    cE('fill', `
      border-radius: var(--n-border-radius);
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 4px;
      right: 4px;
      top: 4px;
      bottom: 4px;
    `),
    cM('disabled', 'cursor: not-allowed'),
    cB('color-picker-checkboard', `
      border-radius: var(--n-border-radius);
    `, [
      c('&::after', `
        --n-block-size: calc((var(--n-height) - 8px) / 3);
        background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
        background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px;  
      `)
    ])
  ]),
  cB('color-picker-swatches', `
    display: grid;
    grid-gap: 8px;
    flex-wrap: wrap;
    position: relative;
    grid-template-columns: repeat(auto-fill, 18px);
    margin-top: 10px;
  `, [
    cB('color-picker-swatch', `
      width: 18px;
      height: 18px;
      background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
      background-size: 8px 8px;
      background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
      background-repeat: repeat;
    `, [
      cE('fill', `
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
        cursor: pointer;
      `),
      c('&:focus', `
        outline: none;
      `, [
        cE('fill', [
          c('&::after', `
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: inherit;
            filter: blur(2px);
            content: "";
          `)
        ])
      ])
    ])
  ])
])

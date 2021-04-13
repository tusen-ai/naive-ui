import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  cB('color-picker-panel', `
    border-radius: 4px;
    padding: 12px;
  `, [
    cB('input', `
      text-align: center;
    `)
  ]),
  cB('color-picker-control', `
  `),
  cB('color-picker-slider', `
    margin-bottom: 8px;
    position: relative;
    box-sizing: border-box;
    box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
  `, [
    cE('grid', `
      height: 6px;
      background-image: linear-gradient(to right,#eee 6px,transparent 6px);
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
    cE('mode', `
      cursor: pointer;
      width: 72px;
      text-align: center;
    `)
  ]),
  cB('color-picker-trigger', `
    display: inline-block;
    height: 34px;
    box-sizing: border-box;
    width: 100%;
    position: relative;
  `, [
    cE('fill', `
      position: absolute;
      left: 4px;
      right: 4px;
      top: 4px;
      bottom: 4px;
    `)
  ])
])

import { c, cB, cNotM, cM } from '../../../_utils/cssr'

export default c([
  cB('watermark-container', `
    position: relative;
  `, [
    cNotM('selectable', `
      user-select: none;
      -webkit-user-select: none;
    `),
    cM('global-rotate', `
      overflow: hidden;
    `),
    cM('fullscreen', `
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: fixed;
    `)
  ]),
  cB('watermark', `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: repeat;
  `, [
    cM('fullscreen', `
      position: fixed;
    `),
    cM('global-rotate', `
      position: absolute;
      height: max(284vh, 284vw);
      width: max(284vh, 284vw);
    `)
  ])
])

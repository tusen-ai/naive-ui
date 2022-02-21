import { cB, cNotM } from '../../../_utils/cssr'

export default cB('watermark-container', `
  position: relative;
`, [
  cB('watermark', `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: repeat;
  `),
  cNotM('selectable', 'user-select: none;')
])

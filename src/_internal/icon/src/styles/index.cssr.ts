import { c, cB, cM, cNotM } from '../../../../_utils/cssr'

export default cB('base-icon', `
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;
  fill: currentColor;
  transform: translateZ(0);
`, [
  c('svg', `
    height: 1em;
    width: 1em;
  `),
  cM('close', `
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: var(--n-close-size);
    height: var(--n-close-size);
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: inherit;
  `),
  cM('close', [
    c('&:hover', 'background-color: var(--n-close-color-hover);')
  ]),
  cNotM('close', [
    c('&:hover', 'color: var(--n-close-icon-color-hover);')
  ])
])

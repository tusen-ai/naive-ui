import { c, cB } from '../../../../_utils/cssr'

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
  `)
])

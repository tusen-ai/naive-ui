import { c, cE, cB } from '../../../_utils/cssr'

// vars:
// --font-size
// --border-radius
// --color
// --bezier
// --size
export default cB('avatar', `
  width: var(--size);
  height: var(--size);
  color: #FFF;
  font-size: var(--font-size);
  display: inline-flex;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-radius: var(--border-radius);
  background-color: var(--color);
  transition:
    background-color .3s var(--bezier),
    color .3s var(--bezier);
`, [
  c('img', `
    width: 100%;
    height: 100%;
  `),
  cE('text', `
    white-space: nowrap;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
  `),
  cB('icon', `
    vertical-align: bottom;
    font-size: var(--size);
  `),
  cE('text', {
    lineHeight: 1.25
  })
])

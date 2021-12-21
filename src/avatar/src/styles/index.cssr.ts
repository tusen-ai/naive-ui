import { c, cE, cB, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-border-radius
// --n-color
// --n-color-modal
// --n-color-popover
// --n-bezier
// --n-merged-size
export default cB('avatar', `
  width: var(--n-merged-size);
  height: var(--n-merged-size);
  color: #FFF;
  font-size: var(--n-font-size);
  display: inline-flex;
  position: relative;
  overflow: hidden;
  text-align: center;
  border: var(--n-border);
  border-radius: var(--n-border-radius);
  --n-merged-color: var(--n-color);
  background-color: var(--n-merged-color);
  transition:
    border-color .3s var(--n-bezier),
    background-color .3s var(--n-bezier),
    color .3s var(--n-bezier);
`, [
  insideModal(c('&', '--n-merged-color: var(--n-color-modal);')),
  insidePopover(c('&', '--n-merged-color: var(--n-color-popover);')),
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
    font-size: calc(var(--n-merged-size) - 6px);
  `),
  cE('text', 'line-height: 1.25')
])

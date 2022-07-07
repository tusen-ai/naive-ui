import { c, cB, cNotM } from '../../../_utils/cssr'
import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-toolbar-icon-color
// --n-toolbar-color
// --n-toolbar-border-radius
// --n-toolbar-box-shadow
// --n-bezier
export default c([
  c('body >', [
    cB('image-container', 'position: fixed;')
  ]),
  cB('image-preview-container', `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  `),
  cB('image-preview-overlay', `
    z-index: -1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
  `, [
    fadeInTransition()
  ]),
  cB('image-preview-toolbar', `
    z-index: 1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--n-toolbar-border-radius);
    height: 48px;
    bottom: 40px;
    padding: 0 12px;
    background: var(--n-toolbar-color);
    box-shadow: var(--n-toolbar-box-shadow);
    color: var(--n-toolbar-icon-color);
    transition: color .3s var(--n-bezier);
    display: flex;
    align-items: center;
  `, [
    cB('base-icon', `
      padding: 0 8px;
      font-size: 28px;
      cursor: pointer;
    `),
    fadeInTransition()
  ]),
  cB('image-preview-wrapper', `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    pointer-events: none;
  `, [
    fadeInScaleUpTransition()
  ]),
  cB('image-preview', `
    user-select: none;
    -webkit-user-select: none;
    pointer-events: all;
    margin: auto;
    max-height: calc(100vh - 32px);
    max-width: calc(100vw - 32px);
    transition: transform .3s var(--n-bezier);
  `),
  cB('image', `
    display: inline-flex;
    max-height: 100%;
    max-width: 100%;
  `, [
    cNotM('preview-disabled', `
      cursor: pointer;
    `),
    c('img', `
      border-radius: inherit;
    `)
  ])
])

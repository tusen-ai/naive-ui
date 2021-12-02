import { c, cB } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'
import fadeInzoomInTransiton from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --icon-color
// --bezier
// --error-background-color
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
    border-radius: 24px;
    height: 48px;
    bottom: 40px;
    padding: 0 12px;
    background: rgba(0, 0, 0, .35);
    color: var(--icon-color);
    transition: color .3s var(--bezier);
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
    fadeInzoomInTransiton()
  ]),
  cB('image-preview', `
    user-select: none;
    pointer-events: all;
    margin: auto;
    max-height: 100vh;
    max-width: 100vw;
    transition: transform .3s var(--bezier);
  `),
  cB('image', `
    display: inline-flex;
    cursor: pointer;
    max-height: 100%;
    max-width: 100%;
    min-width: 100px;
    min-height: 100px;
    position: relative;
  `, [
    c('img', `
      border-radius: inherit;
    `),
    c('image-error-box', `
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--icon-color);
      background-color: var(--error-background-color);
      z-index: 2;
  `)
  ]),
  cB('image-load-box', `
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--load-background-color);
    z-index: 1;
  `),
  cB('image-error-box', `
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--error-background-color);
    z-index: 2;
  `, [
    cB('image-error-default-icon', `
      filter: var(--error-default-filter)
    `)
  ])
])

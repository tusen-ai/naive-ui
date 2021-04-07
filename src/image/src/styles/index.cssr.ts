import { c, cB } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in'
import fadeInScaleUpTransiton from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  c('body >', [
    cB('image-container', 'position: fixed;')
  ]),
  cB('image-preview-container', `
    position: absolute;
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
  cB('image-preview', `
    margin: auto;
    max-height: 100vh;
    transition: transform .3s cubic-bezier(.4, 0, .2, 1);
  `, [
    fadeInScaleUpTransiton()
  ]),
  cB('image', `
    display: inline-flex;
    cursor: pointer;
  `)
])

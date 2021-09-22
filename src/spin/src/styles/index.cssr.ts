import { c, cM, cB } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --bezier
// --opacity-spinning
// --size
// --color
// --text-color
// --font-size
export default c([
  c('@keyframes spin-rotate', `
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  `),
  cB('spin-container', {
    position: 'relative'
  }, [
    cB('spin-body', `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    `, [
      fadeInTransition()
    ])
  ]),
  cB('spin-body', `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `),
  cB('spin', `
    display: inline-flex;
    height: var(--size);
    width: var(--size);
    font-size: var(--size);
    color: var(--color);
  `, [
    cM('rotate', `
      animation: spin-rotate 2s linear infinite;
    `)
  ]),
  cB('spin-description', `
    display: inline-block;
    font-size: var(--font-size);
    color: var(--text-color);
    transition: color .3s var(--bezier);
    margin-top: 8px;
  `),
  cB('spin-content', `
    opacity: 1;
    transition: opacity .3s var(--bezier);
    pointer-events: all;
  `, [
    cM('spinning', `
      user-select: none;
      pointer-events: none;
      opacity: var(--opacity-spinning);
    `)
  ])
])

import { c, cM, cB } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --bezier
// --opacity-spinning
// --size
// --color
export default c([
  cB('spin-container', {
    position: 'relative'
  }, [
    cB('spin', `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    `, [
      fadeInTransition()
    ]),
    cB('spin-content', `
      opacity: 1;
      transition: opacity .3s var(--bezier);
      pointer-events: all;
    `, [
      cM('spinning', {
        pointerEvents: 'none',
        opacity: 'var(--opacity-spinning)'
      })
    ])
  ]),
  cB('spin', `
    display: inline-block;
    height: var(--size);
    width: var(--size);
    font-size: var(--size);
    color: var(--color);
  `)
])

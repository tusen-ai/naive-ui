import { c, cB, cE, cM } from '../../../../_utils/cssr'
import iconSwitchTransition from '../../../../_styles/transitions/icon-switch.cssr'

export default  c([
  c('@keyframes icon-rotate-animation', `
    0% { 
      transform:rotate(0deg);
    }
    100% { 
      transform:rotate(360deg);
    }
  `),
  cB('base-loading', `
    position: relative;
    line-height: 0;
    width: 1em;
    height: 1em;
  `, [
    cE('placeholder', {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    }, [
      iconSwitchTransition({
        left: '50%',
        top: '50%',
        originalTransform: 'translateX(-50%) translateY(-50%)'
      })
    ]),
    cE('icon', `
      height: 1em;
      width: 1em;
    `, [
      iconSwitchTransition()
    ]),
    cE('icon-slot', [
      cM('rotate', `
        display: inline-block;
        animation: icon-rotate-animation 1s linear infinite;
      `)
    ])
  ])
])

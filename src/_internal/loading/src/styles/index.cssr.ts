import { c, cB, cE } from '../../../../_utils/cssr'
import { iconSwitchTransition } from '../../../../_styles/transitions/icon-switch.cssr'
export default c([
  c('@keyframes rotator', `
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }`
  ),
  cB('base-loading', `
    position: relative;
    line-height: 0;
    width: 1em;
    height: 1em;
  `, [
    cE('placeholder', `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  `, [
      iconSwitchTransition({
        left: '50%',
        top: '50%',
        originalTransform: 'translateX(-50%) translateY(-50%)'
      })
    ]),
    cE('container', `
      animation: rotator 3s linear infinite both;
    `, [
      cE('icon', `
        height: 1em;
        width: 1em;
      `, [
        iconSwitchTransition()
      ])
    ])
  ])
])

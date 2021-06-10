import { cB, cE } from '../../../../_utils/cssr'
import iconSwitchTransition from '../../../../_styles/transitions/icon-switch.cssr'

export default cB('base-loading', `
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
  cE('icon', [
    iconSwitchTransition()
  ])
])

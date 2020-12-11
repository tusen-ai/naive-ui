import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { baseSlotMachineLight } from '../../_base/slot-machine/styles'
import { baseWaveLight } from '../../_base/wave/styles'

export default create({
  name: 'Badge',
  theme: 'light',
  peer: [
    baseLight,
    baseWaveLight,
    baseSlotMachineLight
  ],
  getLocalVars (vars) {
    return {
      color: vars.errorColor,
      colorInfo: vars.infoColor,
      colorSuccess: vars.successColor,
      colorError: vars.errorColor,
      colorWarning: vars.warningColor
    }
  }
})

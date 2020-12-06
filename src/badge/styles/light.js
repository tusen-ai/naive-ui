import create from '../../_styles/utils/create-component-base'
import {
  baseSlotMachineLight
} from '../../_base/slot-machine/styles'

export default create({
  name: 'Badge',
  theme: 'light',
  peer: [
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

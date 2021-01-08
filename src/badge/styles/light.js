import { baseSlotMachineLight } from '../../_base/slot-machine/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  common: commonLight,
  peers: {
    BaseSlotMachine: baseSlotMachineLight
  },
  self (vars) {
    const { errorColor, infoColor, successColor, warningColor } = vars
    return {
      color: errorColor,
      colorInfo: infoColor,
      colorSuccess: successColor,
      colorError: errorColor,
      colorWarning: warningColor
    }
  }
}

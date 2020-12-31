import { baseLight } from '../../_styles/base'
import { baseSlotMachineLight } from '../../_base/slot-machine/styles'
import { baseWaveLight } from '../../_base/wave/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  common: commonLight,
  peers: [baseLight, baseWaveLight, baseSlotMachineLight],
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

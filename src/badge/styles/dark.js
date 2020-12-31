import { baseDark } from '../../_styles/base'
import { baseSlotMachineDark } from '../../_base/slot-machine/styles'
import { baseWaveDark } from '../../_base/wave/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  peers: [baseDark, baseWaveDark, baseSlotMachineDark],
  self (vars) {
    const {
      errorColorSuppl,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl
    } = vars
    return {
      color: errorColorSuppl,
      colorInfo: infoColorSuppl,
      colorSuccess: successColorSuppl,
      colorError: errorColorSuppl,
      colorWarning: warningColorSuppl
    }
  }
}

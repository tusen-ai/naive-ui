import { baseSlotMachineDark } from '../../_base/slot-machine/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  peers: {
    BaseSlotMachine: baseSlotMachineDark
  },
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

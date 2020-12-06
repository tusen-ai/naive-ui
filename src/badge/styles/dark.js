import create from '../../_styles/utils/create-component-base'
import {
  baseSlotMachineDark
} from '../../_base/slot-machine/styles'

export default create({
  name: 'Badge',
  theme: 'dark',
  peer: [
    baseSlotMachineDark
  ],
  getLocalVars (vars) {
    return {
      color: vars.errorColorSuppl,
      colorInfo: vars.infoColorSuppl,
      colorSuccess: vars.successColorSuppl,
      colorError: vars.errorColorSuppl,
      colorWarning: vars.warningColorSuppl
    }
  }
})

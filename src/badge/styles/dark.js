import create from '../../_styles/utils/create-component-base'
import {
  baseSlotMachineDark
} from '../../styles'

export default create({
  name: 'Badge',
  theme: 'dark',
  peer: [
    baseSlotMachineDark
  ],
  getDerivedVars (vars) {
    return {
      color: vars.errorColorSuppl,
      colorInfo: vars.infoColorSuppl,
      colorSuccess: vars.successColorSuppl,
      colorError: vars.errorColorSuppl,
      colorWarning: vars.warningColorSuppl
    }
  }
})

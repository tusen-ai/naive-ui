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
  getDerivedVariables ({ derived }) {
    return {
      color: derived.errorColorSuppl,
      colorInfo: derived.infoColorSuppl,
      colorSuccess: derived.successColorSuppl,
      colorError: derived.errorColorSuppl,
      colorWarning: derived.warningColorSuppl
    }
  }
})

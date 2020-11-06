import create from '../../_styles/utils/create-component-base'
import {
  baseSlotMachineLight
} from '../../styles'

export default create({
  name: 'Badge',
  theme: 'light',
  peer: [
    baseSlotMachineLight
  ],
  getDerivedVariables ({ derived }) {
    return {
      color: derived.errorColor,
      colorInfo: derived.infoColor,
      colorSuccess: derived.successColor,
      colorError: derived.errorColor,
      colorWarning: derived.warningColor
    }
  }
})

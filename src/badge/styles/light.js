import create from '../../styles/_utils/create-component-base'
import baseSlotMachineStyle from '../../_base/slot-machine/styles/light'

export default create({
  name: 'Badge',
  theme: 'light',
  peer: [
    baseSlotMachineStyle
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

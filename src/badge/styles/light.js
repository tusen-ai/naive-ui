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
      default: { color: derived.errorColor },
      info: { color: derived.infoColor },
      success: { color: derived.successColor },
      error: { color: derived.errorColor },
      warning: { color: derived.warningColor }
    }
  }
})

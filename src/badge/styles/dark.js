import create from '../../styles/_utils/create-component-base'
import baseSlotMachineStyle from '../../_base/slot-machine/styles/dark'

export default create({
  name: 'Badge',
  theme: 'dark',
  peer: [
    baseSlotMachineStyle
  ],
  getDerivedVariables ({ derived }) {
    return {
      default: { color: derived.errorColorSuppl },
      info: { color: derived.infoColorSuppl },
      success: { color: derived.successColorSuppl },
      error: { color: derived.errorColorSuppl },
      warning: { color: derived.warningColorSuppl }
    }
  }
})

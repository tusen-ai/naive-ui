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
      color: derived.errorColorSuppl,
      colorInfo: derived.infoColorSuppl,
      colorSuccess: derived.successColorSuppl,
      colorError: derived.errorColorSuppl,
      colorWarning: derived.warningColorSuppl
    }
  }
})

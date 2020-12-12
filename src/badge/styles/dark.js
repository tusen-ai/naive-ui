import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { baseSlotMachineDark } from '../../_base/slot-machine/styles'
import { baseWaveDark } from '../../_base/wave/styles'

export default create({
  name: 'Badge',
  theme: 'dark',
  peer: [baseDark, baseWaveDark, baseSlotMachineDark],
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

import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { baseSelectionDark } from '../../_base/selection'
import { baseSelectMenuDark } from '../../_base/select-menu'

export default create({
  name: 'Select',
  theme: 'dark',
  peer: [
    baseDark,
    baseSelectionDark,
    baseSelectMenuDark
  ],
  getLocalVars (vars) {
    return {}
  }
})

import create from '../../_styles/utils/create-component-base'
import { baseSelectionDark } from '../../_base/selection/styles'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'

export default create({
  name: 'Select',
  theme: 'dark',
  peer: [
    baseSelectionDark,
    baseSelectMenuDark
  ],
  getLocalVars (vars) {
    return {}
  }
})

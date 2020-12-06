import create from '../../_styles/utils/create-component-base'
import { baseSelectionLight } from '../../_base/selection/styles'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'

export default create({
  name: 'Select',
  theme: 'light',
  peer: [
    baseSelectionLight,
    baseSelectMenuLight
  ],
  getLocalVars (vars) {
    return {}
  }
})

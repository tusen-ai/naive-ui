import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { baseSelectionLight } from '../../_base/selection'
import { baseSelectMenuLight } from '../../_base/select-menu'

export default create({
  name: 'Select',
  theme: 'light',
  peer: [
    baseLight,
    baseSelectionLight,
    baseSelectMenuLight
  ],
  getLocalVars (vars) {
    return {}
  }
})

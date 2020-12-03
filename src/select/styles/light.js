import create from '../../_styles/utils/create-component-base'
import {
  baseSelectionLight,
  baseSelectMenuLight
} from '../../styles'

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

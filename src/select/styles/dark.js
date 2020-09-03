import create from '../../styles/_utils/create-component-base'
import baseSelectionStyle from '../../_base/selection/styles/dark'
import baseSelectMenuStyle from '../../_base/select-menu/styles/dark'

export default create({
  name: 'Select',
  theme: 'dark',
  peer: [
    baseSelectionStyle,
    baseSelectMenuStyle
  ],
  getDerivedVariables ({ derived, base }) {
    return {}
  }
})

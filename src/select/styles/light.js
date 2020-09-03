import create from '../../styles/_utils/create-component-base'
import baseSelectionStyle from '../../_base/selection/styles/light'
import baseSelectMenuStyle from '../../_base/select-menu/styles/light'

export default create({
  name: 'Select',
  theme: 'light',
  peer: [
    baseSelectionStyle,
    baseSelectMenuStyle
  ],
  getDerivedVariables ({ derived, base }) {
    return {}
  }
})

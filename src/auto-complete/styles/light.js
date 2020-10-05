import create from '../../_styles/utils/create-component-base'
import baseSelectMenuStyle from '../../_base/select-menu/styles/light'
import inputStyle from '../../input/styles/light'

export default create({
  theme: 'light',
  name: 'AutoComplete',
  peer: [
    baseSelectMenuStyle,
    inputStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})

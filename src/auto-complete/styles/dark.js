import create from '../../styles/_utils/create-component-base'
import baseSelectMenuStyle from '../../_base/select-menu/styles/dark'
import inputStyle from '../../input/styles/dark'

export default create({
  theme: 'dark',
  name: 'AutoComplete',
  peer: [
    baseSelectMenuStyle,
    inputStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})

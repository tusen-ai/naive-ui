import create from '../../styles/_utils/create-component-base'
import popoverStyle from '../../popover/styles/light'

export default create({
  theme: 'light',
  name: 'Tooltip',
  peer: [
    popoverStyle
  ],
  getDerivedVariables ({ base, derived }) {
    return {}
  }
})

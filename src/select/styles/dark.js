import create from '../../_styles/utils/create-component-base'
import {
  baseSelectionDark,
  baseSelectMenuDark
} from '../../styles'

export default create({
  name: 'Select',
  theme: 'dark',
  peer: [
    baseSelectionDark,
    baseSelectMenuDark
  ],
  getDerivedVariables ({ derived, base }) {
    return {}
  }
})

import create from '../../_styles/utils/create-component-base'
import {
  baseSelectMenuDark,
  inputDark
} from '../../styles'

export default create({
  theme: 'dark',
  name: 'AutoComplete',
  peer: [
    baseSelectMenuDark,
    inputDark
  ],
  getDerivedVars (vars) {
    return {}
  }
})

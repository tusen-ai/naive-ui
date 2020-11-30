import create from '../../_styles/utils/create-component-base'
import {
  baseSelectMenuLight,
  inputLight
} from '../../styles'

export default create({
  theme: 'light',
  name: 'AutoComplete',
  peer: [
    baseSelectMenuLight,
    inputLight
  ],
  getDerivedVars (vars) {
    return {}
  }
})

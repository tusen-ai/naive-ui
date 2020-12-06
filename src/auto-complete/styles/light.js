import create from '../../_styles/utils/create-component-base'
import {
  baseSelectMenuLight
} from '../../_base/select-menu/styles'
import {
  inputLight
} from '../../input/styles'

export default create({
  theme: 'light',
  name: 'AutoComplete',
  peer: [
    baseSelectMenuLight,
    inputLight
  ],
  getLocalVars (vars) {
    return {}
  }
})

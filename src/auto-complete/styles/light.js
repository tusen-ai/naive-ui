import create from '../../_styles/utils/create-component-base'
import { baseSelectMenuLight } from '../../_base/select-menu'
import { inputLight } from '../../input'

export default create({
  theme: 'light',
  name: 'AutoComplete',
  peer: [
    baseSelectMenuLight,
    inputLight
  ],
  getLocalVars () {
    return {}
  }
})

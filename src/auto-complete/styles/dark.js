import create from '../../_styles/utils/create-component-base'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { inputDark } from '../../input/styles'

export default create({
  theme: 'dark',
  name: 'AutoComplete',
  peer: [baseSelectMenuDark, inputDark],
  getLocalVars () {
    return {}
  }
})

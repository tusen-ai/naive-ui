import create from '../../_styles/utils/create-component-base'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'

export default create({
  name: 'Popselect',
  theme: 'dark',
  peer: [
    baseSelectMenuDark
  ],
  getLocalVars (vars) {
    return {

    }
  }
})

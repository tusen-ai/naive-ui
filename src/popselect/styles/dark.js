import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { baseSelectMenuDark } from '../../_base/select-menu'

export default create({
  name: 'Popselect',
  theme: 'dark',
  peer: [
    baseDark,
    baseSelectMenuDark
  ],
  getLocalVars (vars) {
    return {

    }
  }
})

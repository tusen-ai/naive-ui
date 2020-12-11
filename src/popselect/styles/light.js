import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'

export default create({
  name: 'Popselect',
  theme: 'light',
  peer: [
    baseLight,
    baseSelectMenuLight
  ],
  getLocalVars (vars) {
    return {

    }
  }
})

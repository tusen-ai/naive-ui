import create from '../../_styles/utils/create-component-base'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'

export default create({
  name: 'Popselect',
  theme: 'light',
  peer: [
    baseSelectMenuLight
  ],
  getLocalVars (vars) {
    return {

    }
  }
})
